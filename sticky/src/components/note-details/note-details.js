import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { flex } from '../../styles/styl-utils.js'

class NoteDetails extends Component {
  // getTags = () => {
  //   if(this.props.note.tags.isArray){
  //     (this.props.note.tags.map(tag => {
  //         return (<div className="tag">{tag}</div>)
  //       }
  //   ))
  // } else if (typeof this.props.note.tags == "string"){
  //   (this.props.note.tags.split(',').map(tag => {
  //   return <div className="tag">{tag}</div>
  // }))
  // } else {
  //   return (<div className="noTags"> none </div>)
  // }
  // }

  render() {
    return (
      <div>
        {(this.props.note) ?
          (
            <NoteDetailsDiv>
            <div className="links">
              <div className="left-side-links">
                <Link
                  className="link"
                  to={this.props.note.parent_id ? `/note/${this.props.note.parent_id}/` : `/all-notes/`}
                >to parent note (or all notes)</Link>
              </div>
              <div className="right-side-links">
                <Link
                  className="link"
                  onClick={() => this.props.enableDelete()}
                  to={`/note/${this.props.note.id}/delete`}
                >delete</Link>
                <Link
                  className="link"
                  to={`/note/${this.props.note.id}/edit`}
                >edit</Link>
                <Link
                  className="link"
                  to={`/all-notes/`}
                >back</Link>
              </div>
            </div>
            <div className="note-detail">
              <div className="note-detail-left">
                <div className="note-detail-body">
                  {<ReactMarkdown>{this.props.note.textBody}</ReactMarkdown>}
                </div>
                <div className="note-detail-children">
                  <div className="note-detail-child">Child 1</div>
                  <div className="note-detail-child">Child 2</div>
                  <div className="note-detail-child">Child 3</div>
                  <div className="note-detail-child">Child 4</div>
                </div>
              </div>
              <div className="note-detail-right">
                  <h5>media links</h5>
                  <div className="note-detail-media">Media 1</div>
                  <div className="note-detail-media">Media 2</div>
                  <div className="note-detail-media">Media 3</div>
                  <div className="note-detail-media">Media 4</div>
              </div>
            </div>
          </NoteDetailsDiv>
        ) :
        null}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {state: store};//state is really props & store is store
}

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteDetails));

const NoteDetailsDiv = styled.div`
  ${'' /* border: 1px solid green; */}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  ${'' /* background-color: white; */}
  background-color: #F3F3F3;
  box-sizing: border-box;
  height: 95vh;
  .note-detail-left{
    border: 1px solid red;
  }
  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    text-align: right;
    .left-side-links{
      ${'' /* border: 1px solid red; */}
      width: 100%;
      ${flex()}
    }
    ${'' /* border: 1px solid blue; */}
    .link {
      ${'' /* border: 1px solid red; */}
      margin: 8px;
      color: gray;
      ${'' /* font-weight: bold */}
    }
  }
  .note-detail {
    background-color: white;
    border: 1px solid lightgray;
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    color: black;
    padding: 10px;
    .note-detail-left{
      border: 1px solid green;
      width: 80%;
      margin: 5px;
      .note-detail-body{
        border: 1px solid blue;
        h4 {
          font-weight: bold;
          margin-bottom: 10px;
          text-decoration: underline;
        }
        p {
          line-height: 30px;
        }
        .tags{
          ${'' /* border: 1px solid lightgray; */}
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          div{
            margin: 3px;
            padding: 5px;
          }
          .tag {
            border: 1px solid lightgray;
          }
        }
      }
      .note-detail-children{
        border: 1px solid purple;
        display: flex;
        flex-direction: row;
        .note-detail-child{
          border: 1px solid red;
          margin: 3px;
          display: flex;
          flex-direction: row;
        }
      }
    }
    .note-detail-right{
      border: 1px solid red;
      width: 20%;
      margin: 5px;
      .note-detail-media{
        border: 1px solid green;
      }
    }
    
  }
  

`;