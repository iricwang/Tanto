/* @flow */
/* eslint-disable no-console */

import React from 'react'
import PureComponent from 'components/PureComponent'
import { connect } from 'react-redux'
import CodeDiffView from 'components/CodeDiffView'
import _ from 'lodash'
import { processDiff } from 'ducks/diff'
import Scroll from 'react-scroll'
import Collapse from 'components/Collapse'
import LinearProgress from 'material-ui/LinearProgress'
import { DiffTypes } from 'universal/constants'
import DiffHeader from './DiffHeader'
import { getData } from './selectors'

const Element = Scroll.Element

type Props = {
  id: string,
  file: Object,
  loggedUser: Object,
  dispatch: Function,
  viewType: number,
  unifiedDiff: any,
  sideBySideDiff: any,
  pullRequestId: any,
  comments: Object, // NOTE: not an array but object with comments reduced by line numbers
  onCreateInlineComment: (filePath: string, lineNumber: string, text: string, issue: any) => void,
  onUpdateInlineComment: (commentId: string, text: string) => void,
  onDeleteInlineComment: (commentId: string, text: string) => void,
}

class CodeDiffContainer extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      startedComment: false,
      collapsed: false,
      commentLine: null,
    }
  }

  componentWillMount() {
    const { id, diff, type } = this.props.file
    if (diff) {
      this.props.dispatch(processDiff(id, type, diff, this.props.viewType))
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.file.diff) {
      return
    }
    const { file: { diff, id, type } } = this.props
    if ((diff !== nextProps.file.diff) ||
      ((nextProps.viewType === DiffTypes.UNIFIED && !nextProps.unifiedDiff) ||
        (nextProps.viewType === DiffTypes.SIDE_BY_SIDE && !nextProps.sideBySideDiff))) {
      this.props.dispatch(processDiff(id, type, nextProps.file.diff, nextProps.viewType))
    }
  }

  props: Props
  state: {
    startedComment: boolean,
    collapsed: boolean,
    commentLine: any,
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed })
  }

  handleCreateInlineComment = () => {
    if (this.props.onCreateInlineComment) {
      return (lineNumber: string, text: string, issue: any) =>
        this.props.onCreateInlineComment(this.props.file.name, lineNumber, text, issue)
    }
    return null
  }

  handleDeleteInlineComment = () => {
    if (this.props.onDeleteInlineComment) {
      return (commentId: string) => this.props.onDeleteInlineComment(commentId, this.props.file.name)
    }
    return null
  }


  render() {
    const {
      id,
      pullRequestId,
      loggedUser,
      file: { type, stats, diff, name },
      unifiedDiff,
      sideBySideDiff,
      viewType,
      comments,
    } = this.props

    const { collapsed } = this.state
    const anyDiff = (unifiedDiff && viewType === DiffTypes.UNIFIED) ||
      (sideBySideDiff && viewType === DiffTypes.SIDE_BY_SIDE) ||
      (viewType === DiffTypes.RAW && diff)
    return (
      <div>
        <Element
          key={_.uniqueId(name)}
          name={name.replace(/[/.]/g, '')}
          style={{ marginBottom: '20px' }}
        >
          <DiffHeader
            comments={comments ? comments.length > 0 : false}
            collapsed={collapsed}
            id={id}
            pullRequestId={pullRequestId}
            title={name}
            stats={stats}
            onCollapse={this.onCollapse}
          />
          {!anyDiff && <LinearProgress />}
          {anyDiff &&
            <Collapse isOpened={!collapsed}>
              <CodeDiffView
                type={type}
                comments={comments}
                rawDiff={diff}
                unifiedDiff={unifiedDiff}
                sideBySideDiff={sideBySideDiff}
                loggedUser={loggedUser}
                viewType={viewType}
                onCreateInlineComment={this.handleCreateInlineComment()}
                onDeleteInlineComment={this.handleDeleteInlineComment()}
                onUpdateInlineComment={this.props.onUpdateInlineComment}
              />
            </Collapse>
          }
        </Element>
      </div>

    )
  }
}

/* flow-disable */
export default connect(getData)(CodeDiffContainer)
