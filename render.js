// renderer.js (new file)
let pdfDoc = null;
let currentPage = 1;
let totalPages = 1;
let scale = 1.5;
let isDrawing = false;
let currentTool = null;

const elements = {
  pdfCanvas: document.getElementById('pdfCanvas'),
  annotationCanvas: document.getElementById('annotationCanvas'),
  pdfContainer: document.getElementById('pdfContainer'),
  pageNum: document.getElementById('pageNum'),
  statusText: document.getElementById('statusText')
};

const ctx = elements.annotationCanvas.getContext('2d');

// Initialize
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  setupEventListeners();
  setStatus('Ready');
}

function setupEventListeners() {
  document.getElementById('openPdfBtn').addEventListener('click', openPdf);
  document.getElementById('prevPage').addEventListener('click', prevPage);
  document.getElementById('nextPage').addEventListener('click', nextPage);
  document.getElementById('highlighterBtn').addEventListener('click', setActiveTool);
  document.getElementById('noteBtn').addEventListener('click', setActiveTool);
  
  elements.annotationCanvas.addEventListener('mousedown', startAnnotation);
  elements.annotationCanvas.addEventListener('mousemove', drawAnnotation);
  elements.annotationCanvas.addEventListener('mouseup', endAnnotation);
}

async function openPdf() {
  const filePath = await window.api.openFile();
  if (!filePath) return;

  setStatus('Loading PDF...');
  
  try {
    pdfDoc = await pdfjsLib.getDocument(filePath).promise;
    totalPages = pdfDoc.numPages;
    currentPage = 1;
    updatePageControls();
    renderPage();
    setStatus('PDF loaded successfully');
  } catch (err) {
    setStatus('Error loading PDF', true);
    console.error(err);
  }
}

function renderPage() {
  pdfDoc.getPage(currentPage).then(page => {
    const viewport = page.getViewport({ scale });
    
    elements.pdfCanvas.width = viewport.width;
    elements.pdfCanvas.height = viewport.height;
    elements.annotationCanvas.width = viewport.width;
    elements.annotationCanvas.height = viewport.height;
    
    elements.pdfContainer.style.width = `${viewport.width}px`;
    elements.pdfContainer.style.height = `${viewport.height}px`;

    const renderContext = {
      canvasContext: elements.pdfCanvas.getContext('2d'),
      viewport
    };

    page.render(renderContext);
  });
}

function updatePageControls() {
  elements.pageNum.textContent = `Page ${currentPage}/${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage <= 1;
  document.getElementById('nextPage').disabled = currentPage >= totalPages;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
    updatePageControls();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
    updatePageControls();
  }
}

function setActiveTool(e) {
  document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  currentTool = e.target.id.replace('Btn', '');
}

function setStatus(message, isError = false) {
  elements.statusText.textContent = message;
  elements.statusText.style.color = isError ? '#dc2626' : '#64748b';
}

// Annotation functions
function startAnnotation(e) {
  if (!currentTool) return;
  isDrawing = true;
  // Add annotation logic here
}

function drawAnnotation(e) {
  if (!isDrawing) return;
  // Add drawing logic here
}

function endAnnotation() {
  isDrawing = false;
}