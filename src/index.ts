import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  Widget
} from '@phosphor/widgets';

import { PageConfig } from '@jupyterlab/coreutils';

import '../style/index.css';



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

    window.location.assign(PageConfig.getBaseUrl() + "logout");
    console.log('Emit POST request.');
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
