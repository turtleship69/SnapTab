document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area');
    const resultArea = document.getElementById('result');
    const openInNewTabCheckbox = document.getElementById('open-in-new-tab');
    let imageBlob = null;

    // Handle paste event
    document.addEventListener('paste', function (e) {
        const items = e.clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                imageBlob = URL.createObjectURL(blob);
                resultArea.style.display = 'block';
                dropArea.innerText = 'Image pasted!';
                
                // Open image in a new tab or current tab based on the checkbox
                setTimeout(() => {
                    if (openInNewTabCheckbox.checked) {
                        window.open(imageBlob, '_blank');
                    } else {
                        window.location.href = imageBlob;
                    }
                }, 50);

                break;
            }
        }
    });

    // Handle drag and drop events (optional)
    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropArea.style.border = '2px solid #39f';
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.style.border = '2px dashed #ccc';
    });

    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        dropArea.style.border = '2px dashed #ccc';
        const file = e.dataTransfer.files[0];
        handleImage(file);
    });

    // Handle click to select an image
    dropArea.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function (e) {
            const file = e.target.files[0];
            handleImage(file);
        };
        input.click();
    });

    function handleImage(file) {
        imageBlob = URL.createObjectURL(file);
        resultArea.style.display = 'block';
        dropArea.innerText = 'Image selected!';
        
        // Open image in a new tab or current tab based on the checkbox
        setTimeout(() => {
            if (openInNewTabCheckbox.checked) {
                window.open(imageBlob, '_blank');
            } else {
                window.location.href = imageBlob;
            }
        }, 50);
    }
});
