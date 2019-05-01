import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the core2 extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'core2',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension core2 is activated!');
  }
};

export default extension;
