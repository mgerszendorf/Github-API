const submitBtn = document.querySelector("#submit_btn");
let org = document.querySelector("#urlinput");
const wrapper = document.querySelector(".wrapper");
const nameOrganization = document.querySelector(
  ".name_organization_wrapper h2"
);
const descriptionOrganization = document.querySelector(
  ".description_organization_wrapper h2"
);
const urlOrganization = document.querySelector(".url_organization_wrapper h2");
const emailOrganization = document.querySelector(
  ".email_organization_wrapper h2"
);
const nameOrganizationTxt = document.querySelector(
  ".name_organization_wrapper p"
);
const descriptionOrganizationTxt = document.querySelector(
  ".description_organization_wrapper p"
);
const urlOrganizationTxt = document.querySelector(
  ".url_organization_wrapper a"
);
const emailOrganizationTxt = document.querySelector(
  ".email_organization_wrapper p"
);
const resultArea = document.querySelector(".result_area");

const addAPIData = () => {
  submitBtn.addEventListener("click", () => {
    fetch(`https://api.github.com/orgs/${org.value}`)
      .then((res) => res.json())
      .then((res) => {
        nameOrganization.textContent = "Name: ";
        descriptionOrganization.textContent = "Description: ";
        urlOrganization.textContent = "URL: ";
        emailOrganization.textContent = "Email: ";

        if (res.name === null || res.name === "") {
          nameOrganizationTxt.textContent = "The data has not been shared";
        } else {
          nameOrganizationTxt.textContent = res.name;
        }

        if (res.description === null || res.description === "") {
          descriptionOrganizationTxt.textContent =
            "The data has not been shared";
        } else {
          descriptionOrganizationTxt.textContent = res.description;
        }

        if (res.html_url === null || res.html_url === "") {
          urlOrganizationTxt.textContent = "The data has not been shared";
        } else {
          urlOrganizationTxt.textContent = res.html_url;
          urlOrganizationTxt.href = res.html_url;
        }

        if (res.email === null || res.email === "") {
          emailOrganizationTxt.textContent = "The data has not been shared";
        } else {
          emailOrganizationTxt.textContent = res.email;
        }
      });

    fetch(`https://api.github.com/orgs/${org.value}/repos`)
      .then((res) => res.json())
      .then((res) => {
        const publicProjects = document.getElementById("public_projects");
        publicProjects.remove();

        if (!document.getElementById("public_projects")) {
          const publicProjects = document.createElement("div");
          resultArea.appendChild(publicProjects);
          publicProjects.classList.add("public_projects");
          publicProjects.id = "public_projects";

          const publicProjectsTitle = document.createElement("h2");
          publicProjects.appendChild(publicProjectsTitle);
          publicProjectsTitle.classList.add("public_projects_title");
          publicProjectsTitle.textContent = "Public projects: ";

          for (let i = 0; i < res.length; i++) {
            const publicProjectsTxt = document.createElement("p");
            publicProjects.appendChild(publicProjectsTxt);
            publicProjectsTxt.textContent = res[i].name;
            publicProjectsTxt.onclick = function () {
              console.log(res[i].id);
            };
          }
        }
      });
  });
};
addAPIData();

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
});
