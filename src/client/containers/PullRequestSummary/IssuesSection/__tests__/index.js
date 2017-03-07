import chai from 'chai'
import {
  getIssues,
} from '../index'
import { IssueStatus } from 'universal/constants'

const expect = chai.expect

describe('PullRequestSummary/IssuesSection selectors', () => {
  it('getIssues without obsolete issues', () => {
    const issue1 = { id: 1, owner: {}, assignee: {}, status: IssueStatus.NOW }
    const issue17 = { id: 17, owner: {}, assignee: {}, status: IssueStatus.NEXT }
    const issue13 = { id: 13, owner: {}, assignee: {}, status: IssueStatus.OBSOLETE }
    const issue26 = { id: 26, owner: {}, assignee: {}, status: IssueStatus.OBSOLETE }
    const issues = {
      1: issue1,
      13: issue13,
      17: issue17,
      26: issue26,
    }
    const expectedIssues = { issues: [issue1, issue17] }
    const pullRequest = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
      issues: [1, 13, 17, 26],
    }
    const state = { entities: { pullRequests: { 12: pullRequest }, issues } }
    const props = { params: { prid: 12 } }
    expect(getIssues(state, props)(state, props)).to.deep.eql(expectedIssues)
  })
  it('getIssues, only obsolete issues in PR', () => {
    const issue13 = { id: 13, owner: {}, assignee: {}, status: IssueStatus.OBSOLETE }
    const issue26 = { id: 26, owner: {}, assignee: {}, status: IssueStatus.OBSOLETE }
    const issues = {
      13: issue13,
      26: issue26,
    }
    const expectedIssues = { issues: [] }
    const pullRequest = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
      issues: [13, 26],
    }
    const state = { entities: { pullRequests: { 12: pullRequest }, issues } }
    const props = { params: { prid: 12 } }
    expect(getIssues(state, props)(state, props)).to.deep.eql(expectedIssues)
  })
  it('getIssues, no issues in PR', () => {
    const issue1 = { id: 1, owner: {}, assignee: {}, status: IssueStatus.NOW }
    const issue13 = { id: 13, owner: {}, assignee: {}, status: IssueStatus.OBSOLETE }
    const issues = {
      1: issue1,
      13: issue13,
    }
    const expectedIssues = { issues: [] }
    const pullRequest = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
      issues: [],
    }
    const state = { entities: { pullRequests: { 12: pullRequest }, issues } }
    const props = { params: { prid: 12 } }
    expect(getIssues(state, props)(state, props)).to.deep.eql(expectedIssues)
  })
})