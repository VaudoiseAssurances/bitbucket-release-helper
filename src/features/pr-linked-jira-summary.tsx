import React from 'dom-chef';
import features from '../libs/features';
import { prLinkedIssues } from '../libs/api';
import { waitForAjaxElement } from '../libs/dom-utils';
import { Transition } from '../entities/transition';

function getTransitionsMarkup(transitions: Transition[]) {
  const transitionList = transitions.map(transition => {
    return (
      <li key={transition.id}>
        <a
          className="jira-transition"
          data-transition-id={transition.id}
          href="#"
        >
          {transition.name}
        </a>
      </li>
    );
  });
  return (
    <ul className="jira-transitions aui-list-truncate">{transitionList}</ul>
  );
}

async function init() {
  const selector = '.pull-request-activities';

  await waitForAjaxElement(selector);

  if (document.querySelector('.rvb .linked-jira')) {
    return false;
  }

  const linkedIssues = await prLinkedIssues();

  const linkedIssuesHtml = linkedIssues.map(linkedIssue => {
    let transitionsWrapper;
    if (linkedIssue.canTransition) {
      let transitionHtmlId = `jira-more-transitions${linkedIssue.key}`;

      // Jira transitions buttons
      transitionsWrapper = (
        <div>
          <button
            className="aui-button aui-dropdown2-trigger"
            aria-controls={transitionHtmlId}
          >
            JIRA transitions
          </button>
          <div
            id={transitionHtmlId}
            className="aui-dropdown2 aui-style-default aui-layer"
          >
            {getTransitionsMarkup(linkedIssue.transitions)}
          </div>
        </div>
      );
    }
    return (
      <tr
        className="jira-issue-detailed"
        key={linkedIssue.key}
        data-issue-key={linkedIssue.key}
        data-application-id={linkedIssue.applicationLinkId}
      >
        <td>
          <img
            src={linkedIssue.fields.issuetype.iconUrl}
            alt={linkedIssue.fields.issuetype.name}
            className="aui-icon"
          />
          {linkedIssue.fields.issuetype.name}
        </td>
        <td>
          <a
            href={`/plugins/servlet/jira-integration/issues/${linkedIssue.key}`}
            className="markup-issues-trigger"
            data-issue-keys={linkedIssue.key}
            data-initial-issue-key={linkedIssue.key}
            data-single-issue="true"
            original-title={linkedIssue.key}
          >
            {linkedIssue.key}
          </a>
        </td>
        <td>{linkedIssue.fields.summary}</td>
        <td>
          <span className="aui-lozenge aui-lozenge-subtle aui-lozenge-inprogress issue-status">
            {linkedIssue.fields.status.name}
          </span>
        </td>
        <td>{transitionsWrapper}</td>
      </tr>
    );
  });

  const activitiesNode = document.querySelector(selector);
  activitiesNode.parentElement.insertBefore(
    <div>
      <h3>Tickets</h3>
      <table className="linked-jira aui">
        <tbody>{linkedIssuesHtml}</tbody>
      </table>
    </div>,
    activitiesNode
  );

  // Handle clicks on Jira transitions buttons
  //delegate('.linked-jira .jira-transition', 'click', issueTransition);
}

features.add({
  id: 'pr-linked-jira-summary',
  include: [features.isPRDetailsOverview],
  load: features.onAjaxedPages,
  init,
});
