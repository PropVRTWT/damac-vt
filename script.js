// Function to fetch data from JSON
async function fetchProjects() {
  const response = await fetch('./projects.json'); // Adjust path to your JSON file
  const data = await response.json();
  return data;
}
async function displayProject() {
  const projects = await fetchProjects(); // Assume this function fetches the data.
  const projectContentElem = document.getElementById('project-content');

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const thisProject = projects[projectId];

  if (thisProject) {
    projectContentElem.innerHTML = '';

    thisProject.forEach((titleObj, index) => {
      // Create the accordion button.
      const button = document.createElement('button');
      button.className = 'w-full px-4 py-2 text-left font-semibold flex items-center gap-2 text-sm border-b border-b-[#E5E7EB] focus:outline-none';
      button.innerHTML = `
        <span class="transform transition-transform duration-300">
          <svg class="w-[16px] h-[16px]" width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29785 9.88965L12.2979 15.8896L18.2979 9.88965" stroke="#02030B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        ${titleObj.title}
      `;

      // Create a div to hold the content.
      const contentDiv = document.createElement('div');
      contentDiv.className = 'text-gray-700 bg-white w-full hidden';
      contentDiv.innerHTML = `
        <ul>
          ${titleObj.content.map(item => `
            <li class="flex w-full justify-between py-1 border-b border-b-[#E5E7EB] pl-[40px] pr-8 hover:bg-[#F3F4F6]">
              <span class="flex items-center gap-[74px]">
                <p class="text-sm font-medium text-[#111928]">${item.title}</p>
                <a class="text-sm font-normal text-[#374151] cursor-pointer max-sm:hidden" href="${item.link}" target="_blank">${item.link}</a>
              </span>
              <span class="flex items-center gap-5">
                <a class="p-2 border rounded-lg border-[#E6E6E6] text-sm" href="${item.link}" target="_blank">Open Tour</a>
                <span class="p-2 border rounded-lg border-[#E6E6E6]" onclick="copyLink('${item.link}')">
                                  <svg
                  class="w-[16px] h-[16px] cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.72053 11.8872C8.82045 11.9871 8.87657 12.1227 8.87657 12.264C8.87657 12.4053 8.82045 12.5409 8.72053 12.6408L8.05806 13.3072C7.35747 14.0072 6.40745 14.4003 5.41698 14.4C4.42651 14.3997 3.47673 14.006 2.77659 13.3055C2.07644 12.6051 1.68328 11.6552 1.68359 10.6649C1.68391 9.67463 2.07767 8.72502 2.77826 8.02501L4.38579 6.41776C5.05872 5.74442 5.96358 5.35365 6.91521 5.3254C7.86683 5.29716 8.79328 5.63358 9.50497 6.26584C9.55749 6.31239 9.60032 6.36883 9.63101 6.43193C9.66171 6.49503 9.67968 6.56356 9.68388 6.63361C9.68809 6.70365 9.67846 6.77384 9.65554 6.84016C9.63262 6.90648 9.59686 6.96764 9.55029 7.02015C9.50373 7.07265 9.44728 7.11547 9.38417 7.14616C9.32105 7.17686 9.25251 7.19482 9.18245 7.19903C9.1124 7.20323 9.0422 7.1936 8.97586 7.17069C8.90953 7.14777 8.84836 7.11201 8.79585 7.06546C8.28754 6.61414 7.62598 6.37403 6.94648 6.39422C6.26697 6.41441 5.62084 6.69338 5.14024 7.17407L3.5327 8.77932C3.03265 9.27928 2.75172 9.95737 2.75172 10.6644C2.75172 11.3715 3.03265 12.0496 3.5327 12.5495C4.03276 13.0495 4.71097 13.3304 5.41816 13.3304C6.12534 13.3304 6.80356 13.0495 7.30361 12.5495L7.96609 11.8872C8.0156 11.8376 8.07441 11.7983 8.13913 11.7715C8.20386 11.7446 8.27324 11.7308 8.34331 11.7308C8.41338 11.7308 8.48276 11.7446 8.54749 11.7715C8.61221 11.7983 8.67102 11.8376 8.72053 11.8872ZM13.3912 2.69152C12.6905 1.99253 11.7411 1.59998 10.7513 1.59998C9.76146 1.59998 8.81207 1.99253 8.11138 2.69152L7.4489 3.35454C7.34894 3.45457 7.29282 3.5902 7.29289 3.7316C7.29295 3.873 7.34919 4.00858 7.44924 4.10852C7.54928 4.20846 7.68494 4.26457 7.82636 4.26451C7.96779 4.26445 8.10339 4.20822 8.20335 4.10819L8.86582 3.44583C9.36588 2.94587 10.0441 2.665 10.7513 2.665C11.4585 2.665 12.1367 2.94587 12.6367 3.44583C13.1368 3.9458 13.4177 4.62389 13.4177 5.33094C13.4177 6.038 13.1368 6.71609 12.6367 7.21606L11.0292 8.82463C10.5483 9.30505 9.90207 9.58365 9.22256 9.60347C8.54306 9.62329 7.88165 9.38282 7.37359 8.93125C7.32108 8.88469 7.25991 8.84894 7.19357 8.82602C7.12724 8.8031 7.05704 8.79347 6.98698 8.79768C6.84549 8.80618 6.71318 8.87052 6.61914 8.97656C6.57258 9.02906 6.53682 9.09022 6.5139 9.15654C6.49097 9.22287 6.48134 9.29305 6.48555 9.3631C6.49405 9.50456 6.55841 9.63685 6.66446 9.73087C7.37599 10.3633 8.30234 10.7 9.25397 10.672C10.2056 10.644 11.1105 10.2534 11.7836 9.58027L13.3912 7.97303C14.0907 7.27241 14.4836 6.3229 14.4836 5.33294C14.4836 4.34298 14.0907 3.39347 13.3912 2.69286V2.69152Z"
                    fill="black"
                  />
                </svg>
                </span>
              </span>
            </li>
          `).join('')}
        </ul>
      `;

      // Append elements to the DOM.
      projectContentElem.appendChild(button);
      projectContentElem.appendChild(contentDiv);

      // Add event listener to handle accordion toggle.
      button.addEventListener('click', () => {
        const isOpen = contentDiv.classList.toggle('hidden');
        button.querySelector('svg').classList.toggle('rotate-180', !isOpen);
      });
    });
  } else {
    projectContentElem.innerHTML = '<p>Project not found.</p>';
  }
}

function copyLink(link) {
  navigator.clipboard.writeText(link).then(() => alert("Link Copied:\n"+ link));
}

// Call the function to display the project.
displayProject();

