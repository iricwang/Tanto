/* @flow */
/* eslint-disable max-len */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import Header from './Header'
import ChangesetSection from './ChangesetSection'
import RepositoriesSection from './RepositoriesSection'
import ReviewSection from './ReviewSection'
import BuildSection from './BuildSection'
import IssuesSection from './IssuesSection'

import PullRequestSummary from './index'

const pullRequestFixture = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    fullName: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: [
    {
      status: 'not_reviewed',
      user: {
        fullName: 'Sharron Bronson',
        username: 'sharron',
      },
    },
  ],
  origin: {
    url: 'unity/unity#my-pr',
    name: 'bar',
    type: 'BRANCH',
    repository: {
      name: 'foo',
    },
  },
  target: {
    url: 'unity/unity#trunk',
    name: 'bar',
    type: 'BRANCH',
    repository: {
      name: 'foo',
    },
  },
  files: [
    {
      id: 'C--04c6e90faac2',
      name: 'README.md',
      oldName: 'README.md',
      diff: 'diff --git a/README.md b/README.md\n--- a/README.md\n+++ b/README.md\n@@ -1,1 +1,3 @@\n Foo bar\n+\n+!\n',
      stats: {
        added: 2,
        deleted: 0,
        binary: false,
      },
      operation: 'M',
      comments: [],
    },
  ],
}

const pathsFixture = {
  origin: {
    url: '/unity/unity#my-pr',
    label: 'unity/unity#my-pr',
  },
  target: {
    url: '/unity/unity#trunk',
    label: 'unity/unity#trunk',
  },
}

storiesOf('PullRequestSummary', module)
  .addDecorator(muiTheme())
  .add('enabled', () => (
    <PullRequestSummary
      onToggleReviewer={action('onToggleReviewer')}
      onToggleReviewers={action('onToggleReviewers')}
      paths={pathsFixture}
      pullRequest={pullRequestFixture}
      toggleReviewers={false}
    />
  ))

storiesOf('PullRequestSummary Header', module)
  .addDecorator(muiTheme())
  .add('PullRequestHeader', () => (
    <Header
      pullRequest={pullRequestFixture}
    />
  ))

storiesOf('PullRequestSummary Items', module)
  .addDecorator(muiTheme())
  .add('ChangesSection', () => (
    <ChangesetSection
      pullRequest={pullRequestFixture}
    />
  ))
  .add('RepositoriesSection', () => (
    <RepositoriesSection
      paths={pathsFixture}
      pullRequest={pullRequestFixture}
    />
  ))
  .add('ReviewersSection (no reviewers)', () => (
    <ReviewSection
      reviewers={[]}
    />
  ))
  .add('ReviewersSection (mixed)', () => {
    const reviewers = [
      {
        status: 'not_reviewed',
        user: {
          fullName: 'Sharron Bronson',
          username: 'sharron',
        },
      },
      {
        status: 'approved',
        user: {
          fullName: 'Josephine Gulbranson',
          username: 'josephine',
        },
      },
      {
        status: 'rejected',
        user: {
          fullName: 'Michael Jordan',
          username: 'mjordan',
        },
      },
      {
        status: 'under_review',
        user: {
          fullName: 'Colby Ricotta',
          username: 'colby',
        },
      },
    ]
    return (
      <ReviewSection
        onToggleReviewer={action('onToggleReviewer')}
        onToggleReviewers={action('onToggleReviewers')}
        reviewers={reviewers}
        toggleReviewers={false}
      />
    )
  })
  .add('ReviewersSection (approved)', () => {
    const reviewers = [
      {
        status: 'approved',
        user: {
          fullName: 'Sharron Bronson',
          username: 'sharron',
        },
      },
      {
        status: 'approved',
        user: {
          fullName: 'Josephine Gulbranson',
          username: 'josephine',
        },
      },
    ]
    return (
      <ReviewSection
        onToggleReviewer={action('onToggleReviewer')}
        onToggleReviewers={action('onToggleReviewers')}
        reviewers={reviewers}
        toggleReviewers={false}
      />
    )
  })
  .add('ReviewersSection (rejected)', () => {
    const reviewers = [
      {
        status: 'rejected',
        user: {
          fullName: 'Sharron Bronson',
          username: 'sharron',
        },
      },
    ]
    return (
      <ReviewSection
        onToggleReviewer={action('onToggleReviewer')}
        onToggleReviewers={action('onToggleReviewers')}
        reviewers={reviewers}
        toggleReviewers={false}
      />
    )
  })
  .add('ReviewersSection (toggled)', () => (
    <ReviewSection
      onToggleReviewer={action('onToggleReviewer')}
      onToggleReviewers={action('onToggleReviewers')}
      reviewers={pullRequestFixture.reviewers}
      toggleReviewers
    />
  ))
  .add('BuildSection', () => (
    <BuildSection
      pullRequest={pullRequestFixture}
    />
  ))
  .add('IssuesSection', () => (
    <IssuesSection
      pullRequest={pullRequestFixture}
    />
  ))
