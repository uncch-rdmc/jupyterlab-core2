import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';


import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';
import { Dialog, showDialog } from '@jupyterlab/apputils';

import {
  Widget
} from '@phosphor/widgets';


import '../style/index.css';




/** Makes a HTTP request, sending a git command to the backend */
function httpGitRequest(
  url: string,
  method: string,
  request: Object
): Promise<Response> {
  let fullRequest = {
    method: method,
    body: JSON.stringify(request)
  };

  let setting = ServerConnection.makeSettings();
  let fullUrl = URLExt.join(setting.baseUrl, url);
  return ServerConnection.makeRequest(fullUrl, fullRequest, setting);
}


function activate(app: JupyterLab){
  
  console.log('JupyterLab CORE2 extension is activated');

  let rightAreaOfTopPanel = new Widget()
	rightAreaOfTopPanel.id = 'jp-topPanel-rightArea';
	
	//add submit button
	let submitBtn = document.createElement('button');
	submitBtn.id = "submit";
	submitBtn.className = "btn";
	submitBtn.innerHTML = "Submit";
	submitBtn.addEventListener('click', function () {


    showDialog({
      title: 'You are about to submit files',
      body:
        'Your files will be uploaded to our servers' +
        'Please make sure that the files don\'t have any sensitive data.' +
        'Do you want to continue?',
      buttons: [
        Dialog.cancelButton({ label: 'CANCEL' }),
        Dialog.warnButton({ label: 'PROCEED' })
      ]
    }).then(result => {
      if (result.button.accept) {
        httpGitRequest('/git/add', 'POST', {
          add_all: true,
          filename: "./*",
          top_repo_path: "./"
        });
    
        httpGitRequest('/git/commit', 'POST', {
          commit_msg: "User CORE2 Commit",
          top_repo_path: "./"
        });
    
        httpGitRequest('/git/push', 'POST', {
          current_path: "./"
        });
        console.log('Sent to GitLab');
        return true;
      } else {
        return false;
      }
    });
	});
	
	rightAreaOfTopPanel.node.appendChild(submitBtn);
  app.shell.addToTopArea(rightAreaOfTopPanel);
}

/**
 * Initialization data for the core2 extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'core2',
  autoStart: true,
  activate: activate
};

export default extension;
