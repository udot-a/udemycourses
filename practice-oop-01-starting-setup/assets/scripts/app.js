class DOMHelper {
    static clearEventListener(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);

        return clonedElement;
    }

    static moveElement(elementId, newDestinationSelector) {
        const element = window[elementId];
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
        element.scrollIntoView({behavior: "smooth"});


    }
}

class Component {

}

class Tooltip {
    show(context) {
        let tooltip = document.getElementById("tooltip");
        if (tooltip) {
            tooltip.remove();
        }
        tooltip = document.body.appendChild(document.createElement("div"));
        tooltip.className = "card";
        tooltip.id = "tooltip";
        tooltip.textContent = context;
        setTimeout(() => tooltip && tooltip.remove(), 3000)
        tooltip.onclick = ({ target }) => target.remove();

    }
}

class ProjectItem {
    constructor(id, updateProjectLisFunc, type) {
        this.id = id;
        this.updateProjectListFunc = updateProjectLisFunc;
        this.connectSwitchBtn(type);
        this.connectMoreInfoBtn();
    }

    connectMoreInfoBtn() {
        let moreInfoBtn = window[this.id].querySelector("button:first-of-type");

        moreInfoBtn.addEventListener(
            "click",
            this.handleShowMoreInfo
        )
    }

    handleShowMoreInfo = () => {
        const tooltip = new Tooltip();
        console.dir(document.getElementById(this.id))
        tooltip.show(
            document.getElementById(this.id).dataset.extraInfo
        );

    }

    connectSwitchBtn(type) {
        let switchBtn = window[this.id].querySelector("button:last-of-type");

        switchBtn = DOMHelper.clearEventListener(switchBtn);

        switchBtn.textContent = type === "active" ? "Finished" : "Activate";

        switchBtn.addEventListener(
            "click",
            this.updateProjectListFunc.bind(null, this.id)
        );
    }

    update(updateProjectListFn, type) {
        this.updateProjectListFunc = updateProjectListFn;
        this.connectSwitchBtn(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);

        prjItems.forEach(
            item => this.projects.push(new ProjectItem(item.id, this.switchProject.bind(this), this.type))
        );
    }

    setHandleSwitch = handleSwitch =>   this.handleSwitch = handleSwitch;

    addProject (project){
        this.projects.push(project);

        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);

        project.update(this.switchProject.bind(this), this.type);

    }

    switchProject (projectId) {
            this.handleSwitch && this.handleSwitch(this.projects.find(({ id }) => id === projectId ));
            this.projects = this.projects.filter(({id}) => id !== projectId)
    }
}

class App {
    static  init() {
        const activeProjectList = new ProjectList("active");
        const finishedProjectList = new ProjectList("finished");
        activeProjectList.setHandleSwitch(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setHandleSwitch(activeProjectList.addProject.bind(activeProjectList));
    }
}

App.init();


