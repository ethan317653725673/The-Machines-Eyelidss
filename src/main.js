const storyContainer = document.querySelector('#story');

function parseStory(text) {
  let chapterCount = 0;
  let italicMode = false;

  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {

      // CHAPTER HEADER
      if (line.startsWith("[[") && line.endsWith("]]")) {
        chapterCount++;

        const chapterTitle = line.slice(2, -2).trim();

        italicMode = (chapterCount === 3);

        return `<h2 class="chapter">${chapterTitle}</h2>`;
      }

      // NORMAL TEXT
      if (italicMode) {
        return `<p class="chapter-italic-text">${line}</p>`;
      }

      return `<p>${line}</p>`;
    })
    .join("");
}

fetch("./Assets/Text/Story.txt")
  .then(res => res.text())
  .then(text => {
    storyContainer.innerHTML = parseStory(text);
  });

/*
fetch('/Assets/Text/Story.txt')
  .then(response => {
    if (!response.ok) throw new Error('Could not load story file.');
    return response.text();
  })
  .then(text => {
    if (!text.trim()) {
      storyContainer.innerHTML = '<p><em>No story text found.</em></p>';
      return;
    }

    // Split on blank lines to get paragraphs, filter out empty strings
    const paragraphs = text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    storyContainer.innerHTML = parseStory(text);
  })
  .catch(err => {
    storyContainer.innerHTML = `<p><em>Error loading story: ${err.message}</em></p>`;
  });

*/