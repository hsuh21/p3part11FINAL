window.addEventListener('DOMContentLoaded', () => {
    const channel = 'les-stereotypes-francais';
    //fetch calls function
    fetch(`https://api.are.na/v2/channels/${channel}?per=100`, {cache: 'no-store'})
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        renderBlocks(data);
      });
    });

    
    const renderBlocks = (data) => {
      let blocks = data['contents'];
      let hue = 0;
      blocks.forEach((block) => {
        let blockClass = block['class'];
          if (blockClass == 'Image') {
            renderImage(block, hue);
          }
          hue = hue + 50;
      });
    };

    const renderImage = (block, hue) => {
      let author = block['user']['slug'];
      console.log(block)

      let parentElement = document.querySelector('#contents-american');
      if (author == 'hannah-suh'){
        parentElement = document.querySelector('#contents-french');
      }

      //calling the json attribute with the following pathway
      let imageUrl = block['image']['display']['url'];
      let imageBlockTemplate = document.getElementById('image-block');
      let clone  = imageBlockTemplate.content.cloneNode(true);

      clone.querySelector('img').src = imageUrl;
      //calls title
      clone.querySelector('p').innerText = block['title'];

      //changing the background color of .block using randomly generated variable
      //let randomHue = Math.random()*225;
      let randomColor = 'hsl(' + hue + ', 100%, 50%';
      clone.querySelector('li').style.setProperty('--color', randomColor);


      parentElement.appendChild(clone);
    };