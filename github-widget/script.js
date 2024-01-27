var repoUrl1 = 'https://github.com/schulsani/client';
var historyStack1 = [''];

var repoUrl2 = 'https://github.com/schulsani/server';
var historyStack2 = [''];

// Handle popstate events for repository 1
window.onpopstate = function(event) {
    if (historyStack1.length > 1) {
        historyStack1.pop();
        loadRepo1(historyStack1[historyStack1.length - 1]);
    }
};

// Handle popstate events for repository 2
window.onpopstate = function(event) {
    if (historyStack2.length > 1) {
        historyStack2.pop();
        loadRepo2(historyStack2[historyStack2.length - 1]);
    }
};

function loadRepo1(path) {
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
            codeContainer1.style.height = '400px';

            historyStack1 = [''];

            data.forEach(item => {
                if (item.type === 'file') {
                    if (item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') || item.name.toLowerCase().endsWith('.png') || item.name.toLowerCase().endsWith('.gif')) {
                        // Display image files
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function() {
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
                        fileItem.addEventListener('click', function() {
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
                        fileItem.addEventListener('click', function() {
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
                    itemElement.addEventListener('click', function() {
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

            // Add a button to go up one level in the hierarchy
            // Add a button to go up one level in the hierarchy
if (historyStack1.length > 1) {
    var backButton = document.createElement('button');
    backButton.innerText = 'Go Up';
    backButton.classList.add('button');
    backButton.addEventListener('click', function() {
        historyStack1.pop();
        loadRepo1(historyStack1[historyStack1.length - 1]);
    });
    sidebar.appendChild(backButton);
}

        })
        .catch(error => {
            console.error('Error loading repository 1:', error);
        });
}

function loadRepo2(path) {
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
            codeContainer2.style.height = '400px';

            historyStack2 = [''];

            data.forEach(item => {
                if (item.type === 'file') {
                    if (item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') || item.name.toLowerCase().endsWith('.png') || item.name.toLowerCase().endsWith('.gif')) {
                        // Display image files
                        var fileItem = document.createElement('div');
                        fileItem.classList.add('item');
                        fileItem.innerText = item.name;
                        fileItem.addEventListener('click', function() {
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
                        fileItem.addEventListener('click', function() {
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
                        fileItem.addEventListener('click', function() {
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
                    itemElement.addEventListener('click', function() {
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

            // Add a button to go up one level in the hierarchy
            if (historyStack2.length > 1) {
                var backButton = document.createElement('button');
                backButton.innerText = 'Go Up';
                backButton.classList.add('button');
                backButton.addEventListener('click', function() {
                    historyStack2.pop();
                    loadRepo2(historyStack2[historyStack2.length - 1]);
                });
                sidebar.appendChild(backButton);
            }
        })
        .catch(error => {
            console.error('Error loading repository 2:', error);
        });
}

// Load the initial state for both repositories
loadRepo1('');
loadRepo2('');
