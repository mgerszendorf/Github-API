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
const popup = document.querySelector(".popup");
const cross = document.querySelector(".cross");

const namePopupTitle = document.querySelector(".name_popup h2");
const urlPopupTitle = document.querySelector(".url_popup h2");
const sshPopupTitle = document.querySelector(".ssh_popup h2");
const cloneUrlPopupTitle = document.querySelector(".clone_url_popup h2");
const starsPopupTitle = document.querySelector(".stars_popup h2");
const sizePopupTitle = document.querySelector(".size_popup h2");
const descriptionPopupTitle = document.querySelector(".description_popup h2");

const urlPopupTxt = document.querySelector(".url_popup p");
const sshPopupTxt = document.querySelector(".ssh_popup p");
const cloneUrlPopupTxt = document.querySelector(".clone_url_popup p");
const starsPopupTxt = document.querySelector(".stars_popup p");
const sizePopupTxt = document.querySelector(".size_popup p");
const descriptionPopupTxt = document.querySelector(".description_popup p");

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

              popup.classList.add("active_popup");

              cross.onclick = function () {
                popup.classList.remove("active_popup");
              };

              namePopupTitle.textContent = res[i].name;
              urlPopupTitle.textContent = "URL: ";
              sshPopupTitle.textContent = "SSH: ";
              cloneUrlPopupTitle.textContent = "Clone URL: ";
              starsPopupTitle.textContent = "Stars: ";
              sizePopupTitle.textContent = "Size: ";
              descriptionPopupTitle.textContent = "Description: ";

              urlPopupTxt.textContent = res[i].html_url;
              sshPopupTxt.textContent = res[i].ssh_url;
              cloneUrlPopupTxt.textContent = res[i].clone_url;
              starsPopupTxt.textContent = res[i].stargazers_count;
              sizePopupTxt.textContent = res[i].size;
              if (res[i].description === null || res[i].description === "") {
                descriptionPopupTxt.textContent =
                  "The data has not been shared";
              } else {
                descriptionPopupTxt.textContent = res[i].description;
              }
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
