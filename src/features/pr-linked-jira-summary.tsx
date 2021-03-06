import React from 'dom-chef';
import features from '../libs/features';
import { prLinkedIssues } from '../libs/api';
import { waitForAjaxElement } from '../libs/dom-utils';

async function init() {
  const selector = '.pull-request-activities';

  await waitForAjaxElement(selector);

  if (document.querySelector('.rvb .linked-jira')) {
    return false;
  }

  const linkedIssues = await prLinkedIssues();

  const linkedIssuesHtml = linkedIssues.map(linkedIssue => {
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
      </tr>
    );
  });

  const issueIds = linkedIssues.map(linkedIssue => linkedIssue.key)
    .join(`,`);

  const activitiesNode = document.querySelector(selector);
  activitiesNode.parentElement.insertBefore(
    <div>
      <h3>Action: </h3>
      <a href={`https://di.vaudoise.ch/issues/?jql=id in (${issueIds})`} target="_blank">
        <button className="aui-button">Open issues in JIRA</button>
      </a>
      <h3>Tickets</h3>
      <table className="linked-jira aui">
        <tbody>{linkedIssuesHtml}</tbody>
      </table>
    </div>,
    activitiesNode
  );
}

features.add({
  id: 'pr-linked-jira-summary',
  include: [features.isPRDetailsOverview],
  load: features.onAjaxedPages,
  init,
});
