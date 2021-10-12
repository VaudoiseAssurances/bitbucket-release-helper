import OptionsSync from 'webext-options-sync';

// Define defaults
new OptionsSync({
  defaults: {
    disabledFeatures: '',
    customCSS: '',
    personalToken: '',
    logging: false,
    bitbucketServer: 'https://git.vaudoise.ch',
  },
  migrations: [OptionsSync.migrations.removeUnused],
});
