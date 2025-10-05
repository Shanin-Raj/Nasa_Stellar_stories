// Storage for uploaded images
const uploadedImages = {
    cover: null,
    page2: null,
    page3_1: null,
    page3_2: null,
    page4: null,
    page5: null,
    page6: null,
    page7: null,
    page8: null,
    page9: null,
    page10: null,
    page11: null,
    page12: null
};

// Initialize upload functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFileInputs();
    setupDragAndDrop();
    loadSavedImages();
});

// Setup file inputs
function setupFileInputs() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            handleFileSelect(e.target.files[0], e.target.dataset.page);
        });
    });
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            area.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', function(e) {
            e.preventDefault();
            area.classList.remove('dragover');
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            area.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0], area.dataset.page);
            }
        });
    });
}

// Handle file selection
function handleFileSelect(file, pageId) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, WebP)');
        return;
    }
    
    // Check file size (optional - limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image file size should be less than 5MB');
        return;
    }
    
    // Create file reader
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Store image data
        const storageKey = pageId.replace('-', '_');
        uploadedImages[storageKey] = imageData;
        
        // Show preview
        showPreview(imageData, pageId);
        
        // Save to localStorage
        saveImageToStorage(storageKey, imageData);
        
        console.log(`Image uploaded for ${pageId}`);
    };
    
    reader.readAsDataURL(file);
}

// Show image preview
function showPreview(imageData, pageId) {
    const previewContainer = document.getElementById(`${pageId}-preview`);
    
    // Clear existing preview
    previewContainer.innerHTML = '';
    
    // Create preview image
    const img = document.createElement('img');
    img.src = imageData;
    img.className = 'preview-image';
    img.alt = `Preview for ${pageId}`;
    
    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.padding = '5px 10px';
    removeBtn.style.background = '#dc3545';
    removeBtn.style.color = 'white';
    removeBtn.style.border = 'none';
    removeBtn.style.borderRadius = '5px';
    removeBtn.style.cursor = 'pointer';
    
    removeBtn.onclick = function() {
        removeImage(pageId);
    };
    
    const previewDiv = document.createElement('div');
    previewDiv.appendChild(img);
    previewDiv.appendChild(removeBtn);
    
    previewContainer.appendChild(previewDiv);
}

// Remove image
function removeImage(pageId) {
    const storageKey = pageId.replace('-', '_');
    uploadedImages[storageKey] = null;
    
    // Clear preview
    const previewContainer = document.getElementById(`${pageId}-preview`);
    previewContainer.innerHTML = '';
    
    // Remove from localStorage
    localStorage.removeItem(`storybook_${storageKey}`);
    
    console.log(`Image removed for ${pageId}`);
}

// Save image to localStorage
function saveImageToStorage(key, imageData) {
    try {
        localStorage.setItem(`storybook_${key}`, imageData);
    } catch (e) {
        console.warn('Could not save image to localStorage:', e.message);
        alert('Warning: Image could not be saved locally. You may need to re-upload when you refresh the page.');
    }
}

// Load saved images
function loadSavedImages() {
    Object.keys(uploadedImages).forEach(key => {
        const saved = localStorage.getItem(`storybook_${key}`);
        if (saved) {
            uploadedImages[key] = saved;
            const pageId = key.replace('_', '-');
            showPreview(saved, pageId);
        }
    });
}

// Generate updated storybook
function generateStorybook() {
    // Check if at least some images are uploaded
    const hasImages = Object.values(uploadedImages).some(img => img !== null);
    
    if (!hasImages) {
        alert('Please upload at least one image before generating the storybook.');
        return;
    }
    
    // Create updated HTML content
    updateStorybookHTML();
    
    alert('Storybook updated successfully! Check your main storybook page.');
    
    // Optional: redirect to main storybook
    window.open('index.html', '_blank');
}

// Update the main storybook HTML with uploaded images
function updateStorybookHTML() {
    // This would typically make API calls or update files
    // For now, we'll save the configuration and let the main page read it
    
    const imageConfig = {
        cover: uploadedImages.cover,
        page2: uploadedImages.page2,
        page3: {
            image1: uploadedImages.page3_1,
            image2: uploadedImages.page3_2
        },
        page4: uploadedImages.page4,
        page5: uploadedImages.page5,
        page6: uploadedImages.page6,
        page7: uploadedImages.page7,
        page8: uploadedImages.page8,
        page9: uploadedImages.page9,
        page10: uploadedImages.page10,
        page11: uploadedImages.page11,
        page12: uploadedImages.page12
    };
    
    // Save configuration
    localStorage.setItem('storybook_config', JSON.stringify(imageConfig));
    
    console.log('Storybook configuration saved:', imageConfig);
}

// Utility function to get image for a specific page
function getImageForPage(pageNumber) {
    const config = JSON.parse(localStorage.getItem('storybook_config') || '{}');
    
    switch(pageNumber) {
        case 0: return config.cover;
        case 1: return config.page2;
        case 2: return config.page3; // Returns object with image1 and image2
        case 3: return config.page4;
        case 4: return config.page5;
        case 5: return config.page6;
        case 6: return config.page7;
        case 7: return config.page8;
        case 8: return config.page9;
        case 9: return config.page10;
        case 10: return config.page11;
        case 11: return config.page12;
        default: return null;
    }
}

// Export for use in main storybook
window.storybookImageManager = {
    getImageForPage: getImageForPage,
    hasImages: () => {
        const config = JSON.parse(localStorage.getItem('storybook_config') || '{}');
        return Object.keys(config).length > 0;
    }
};
