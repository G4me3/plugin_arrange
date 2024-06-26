import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Publish from '@material-ui/icons/Publish';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PropTypes, { bool } from 'prop-types';
import { withStyles } from '@material-ui/core';
import { validateInputFields } from './AnnotationUploader';

/** */
const styles = (theme) => ({
  listitem: {
    '&:focus': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

export let content;

/** */
class AnnotationUploadDialog extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      exportLinks: [],
    };
    this.closeDialog = this.closeDialog.bind(this);
  }

  /** */
  componentDidUpdate(prevProps) {
    const { canvases, config, open } = this.props;
    const { open: prevOpen } = prevProps || {};
    if (prevOpen !== open && open) {
      /** */
      const reducer = async (acc, canvas) => {
        const store = config.annotation.adapter(canvas.id);
        const resolvedAcc = await acc;
        content = await store.all();
        if (content) {
          // eslint-disable-next-line no-underscore-dangle
          const label = (canvas.__jsonld && canvas.__jsonld.label) || canvas.id;
          const data = new Blob([JSON.stringify(content)], { type: 'application/json' });
          const url = window.URL.createObjectURL(data);
          return [...resolvedAcc, {
            canvasId: canvas.id,
            id: content.id || content['@id'],
            label,
            url,
          }];
        }
        return resolvedAcc;
      };
      if (canvases && canvases.length > 0) {
        canvases.reduce(reducer, []).then((exportLinks) => {
          this.setState({ exportLinks });
        });
      }
    }
  }

  /** */
  closeDialog() {
    const { handleClose } = this.props;
    this.setState({ exportLinks: [] });
    handleClose();
  }

  /** */
  render() {
    const { classes, handleClose, open } = this.props;
    const { exportLinks } = this.state;
    return (
      <Dialog
        aria-labelledby="annotation-export-dialog-title"
        id="annotation-export-dialog"
        onClose={handleClose}
        onEscapeKeyDown={this.closeDialog}
        open={open}
        className='annotation-upload-dialog'
      >
        <DialogTitle id="annotation-export-dialog-title" disableTypography>
          <Typography variant="h2">アノテーションのアップロード</Typography>
        </DialogTitle>
        <DialogContent>
          {exportLinks === undefined || exportLinks.length === 0 ? (
            <Typography variant="body1">アップロードするアノテーションがありません</Typography>
          ) : (
            <MenuList>
              <div class="cp_iptxt">
                <label for ='username' className='label-write-area'>名前<div class="asterisk">* </div>：</label><br></br>
                <label class="ef">
                  <input
                    id="username"
                    type="text"
                    placeholder="名前を入力してください"
                    defaultValue={localStorage.getItem("username")}
                    name='username'
                  />
                </label>
              </div>
              <div class="cp_iptxt">
                <label for ='delete-key' className='label-write-area'>削除キー<div class="asterisk">* </div>：</label><br></br>
                <label class="ef">
                  <input
                    id="delete-key"
                    type="text"
                    placeholder="削除キーを入力してください"
                    name='delete-key'
                  />
                </label>
              </div>
              <span className='vertical-line'></span>
              {exportLinks.map((dl) => (
                <MenuItem
                  button
                  className={classes.listitem}
                  component="a"
                  key={dl.canvasId}
                  aria-label={`アノテーションをサーバーにアップロードする`}
                  onClick={() => validateInputFields(content)}
                >
                  <ListItemIcon>
                    <Publish />
                  </ListItemIcon>
                  <ListItemText>
                    {`アノテーションをサーバーにアップロードする`}
                  </ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

AnnotationUploadDialog.propTypes = {
  canvases: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string }),
  ).isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  config: PropTypes.shape({
    annotation: PropTypes.shape({
      adapter: PropTypes.func,
    }),
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: bool.isRequired,
};

AnnotationUploadDialog.defaultProps = {
  classes: {},
};

export default withStyles(styles)(AnnotationUploadDialog);