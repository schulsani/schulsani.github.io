// Define repository URLs and history stacks
var repoUrl1 = 'https://github.com/schulsani/client';
var historyStack1 = [''];

var repoUrl2 = 'https://github.com/schulsani/server';
var historyStack2 = [''];

// Function to load repository 1
function loadRepo1(path = '') {
    var repoApiUrl = repoUrl1.replace('github.com', 'api.github.com/repos').replace('/blob', '') + '/contents/' + path;

    fetch(repoApiUrl)
        .then(response => response.json())
        .then(data => {
            var sidebar = document.getElementById('sidebar1');
            var codeContainer = document.getElementById('codeContainer1');

            // Clear existing content
            sidebar.innerHTML = '<h2>Files</h2>';
            codeContainer.innerHTML = '';

            // Add buttons to switch between client and server libraries

            // Add a button to toggle sidebar visibility

            // Add a button to go up one level in the hierarchy
            if (historyStack1.length > 1) {
                sidebar.innerHTML += '<button class="button" onclick="goUp(historyStack1, loadRepo1)">Go Up</button>';
            }

            historyStack1 = [''];

            data.forEach(item => {
                if (item.type === 'file') {
                    if (item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') || item.name.toLowerCase().endsWith('.png') || item.name.toLowerCase().endsWith('.gif')) {
                        // Display image files
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function () {
                            var image = document.createElement('img');
                            image.src = item.download_url;
                            image.alt = item.name;
                            codeContainer.innerHTML = '';
                            codeContainer.appendChild(image);
                        });
                        sidebar.appendChild(fileItem);
                    } else if (item.name.toLowerCase().endsWith('.zip')) {
                        // Handle zip files
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function () {
                            var downloadLink = document.createElement('a');
                            downloadLink.href = item.download_url;
                            downloadLink.download = item.name;
                            downloadLink.textContent = 'Download ' + item.name;
                            codeContainer.innerHTML = '';
                            codeContainer.appendChild(downloadLink);
                        });
                        sidebar.appendChild(fileItem);
                    } else if (item.name.toLowerCase() !== 'readme.md') {
                        // Display other file types
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function () {
                            fetch(item.download_url)
                                .then(response => response.text())
                                .then(fileContent => {
                                    // Encode HTML entities to prevent execution
                                    var encodedContent = fileContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                                    codeContainer.innerHTML = `<pre>${encodedContent}</pre>`;
                                });
                        });
                        sidebar.appendChild(fileItem);
                    }
                }

                if (item.type === 'dir') {
                    var itemElement = document.createElement('div');
                    itemElement.classList.add('item');
                    itemElement.innerText = item.name;
                    itemElement.addEventListener('click', function () {
                        historyStack1.push(path + '/' + item.name);
                        loadRepo1(path + '/' + item.name);
                    });
                    sidebar.appendChild(itemElement);

                    if (item.name.toLowerCase() !== 'readme.md') {
                        var folderIcon = document.createElement('i');
                        folderIcon.classList.add('fas', 'fa-folder', 'folder-icon');
                        itemElement.prepend(folderIcon);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading repository 1:', error);
        });
}

// Function to load repository 2
function loadRepo2(path = '') {
    var repoApiUrl = repoUrl2.replace('github.com', 'api.github.com/repos').replace('/blob', '') + '/contents/' + path;

    fetch(repoApiUrl)
        .then(response => response.json())
        .then(data => {
            var sidebar = document.getElementById('sidebar2');
            var codeContainer = document.getElementById('codeContainer2');

            // Clear existing content
            sidebar.innerHTML = '<h2>Files</h2>';
            codeContainer.innerHTML = '';

            // Add buttons to switch between client and server libraries

            // Add a button to toggle sidebar visibility

            // Add a button to go up one level in the hierarchy
            if (historyStack2.length > 1) {
                sidebar.innerHTML += '<button class="button" onclick="goUp(historyStack2, loadRepo2)">Go Up</button>';
            }

            historyStack2 = [''];

            data.forEach(item => {
                if (item.type === 'file') {
                    if (item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') || item.name.toLowerCase().endsWith('.png') || item.name.toLowerCase().endsWith('.gif')) {
                        // Display image files
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function () {
                            var image = document.createElement('img');
                            image.src = item.download_url;
                            image.alt = item.name;
                            codeContainer.innerHTML = '';
                            codeContainer.appendChild(image);
                        });
                        sidebar.appendChild(fileItem);
                    } else if (item.name.toLowerCase().endsWith('.zip')) {
                        // Handle zip files
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function () {
                            var downloadLink = document.createElement('a');
                            downloadLink.href = item.download_url;
                            downloadLink.download = item.name;
                            downloadLink.textContent = 'Download ' + item.name;
                            codeContainer.innerHTML = '';
                            codeContainer.appendChild(downloadLink);
                        });
                        sidebar.appendChild(fileItem);
                    } else if (item.name.toLowerCase() !== 'readme.md') {
                        // Display other file types
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function () {
                            fetch(item.download_url)
                                .then(response => response.text())
                                .then(fileContent => {
                                    // Encode HTML entities to prevent execution
                                    var encodedContent = fileContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                                    codeContainer.innerHTML = `<pre>${encodedContent}</pre>`;
                                });
                        });
                        sidebar.appendChild(fileItem);
                    }
                }

                if (item.type === 'dir') {
                    var itemElement = document.createElement('div');
                    itemElement.classList.add('item');
                    itemElement.innerText = item.name;
                    itemElement.addEventListener('click', function () {
                        historyStack2.push(path + '/' + item.name);
                        loadRepo2(path + '/' + item.name);
                    });
                    sidebar.appendChild(itemElement);

                    if (item.name.toLowerCase() !== 'readme.md') {
                        var folderIcon = document.createElement('i');
                        folderIcon.classList.add('fas', 'fa-folder', 'folder-icon');
                        itemElement.prepend(folderIcon);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading repository 2:', error);
        });
}

// Function to go up one level in the hierarchy
function goUp(historyStack, loadFunction) {
    historyStack.pop();
    loadFunction(historyStack[historyStack.length - 1]);
}

// Add event listeners for sidebar toggles and load initial state
document.addEventListener('DOMContentLoaded', function () {
    function setupSidebarToggle() {
        const sidebarToggles = document.querySelectorAll('.sidebar-toggle');

        sidebarToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                const sidebar = this.closest('.sidebar');
                sidebar.classList.toggle('collapsed');
            });
        });
    }

    setupSidebarToggle();

    // Load the initial state for both repositories
    loadRepo1('');
    loadRepo2('');

    const collapseButton = document.querySelector('.collapseButton');
    collapseButton.addEventListener('click', function () {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
    });
});
