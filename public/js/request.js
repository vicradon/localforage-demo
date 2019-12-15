const $ = n => document.querySelector(n);
// const localforage = require('localforage')


const nodes = {
  requestName: $('.request-name'),
  requestButton: $('.request-button'),
  requestNextPostButton: $('.request-next-post-button'),
  requestedPosts: $('.requested-posts')
}

const {
  requestName,
  requestButton,
  requestNextPostButton,
  requestedPosts
} = nodes;


function postComp(title, content, id) {
  let stuff = '';
  if( content.split(' ').length > 5){
    stuff = content.split(' ').slice(0, 5).join(' ');
    let temparr = stuff.split(' ')[4].split('');
    let other = stuff.split(' ').slice(0, 4).join(' ');
    if (temparr[temparr.length -1] === ','){
      const index = temparr.findIndex(x => x === ',');
      temparr.splice(index, 1)
      stuff = `${other} ${temparr.join('')}`;
    }
    stuff = `${stuff}...`
  }
  else {stuff = content}

  return `
    <div data-id = ${id} class = 'post'>
      <h3>${title}</h3>
      <p>${stuff}</p>

      <div class = 'post-actions'>
        <button type = "button" class = 'edit-post'>Edit</button>
        <button type = "button" class = 'delete-post'>Delete</button>
      </div>
    </div>
  `
}


function displayRequested(post) {
  let a = '';
  post.forEach(p => a += postComp(p.title, p.content, p.id));
  requestedPosts.innerHTML = a;
}
function displayRequestedNext(post) {
  const nextPost = postComp(post.title, post.content, post.id)
  requestedPosts.innerHTML += nextPost;
}

requestButton.onclick = () => {
  if (requestName.value.trim().length !== 0) {
    const title = requestName.value.trim().toLowerCase();
    localforage.getItem('posts', (err, posts) => {
      if (err) {
        console.log(err)
      }
      const post = posts.filter(x => x.title.toLowerCase() === title);
      if (post.length > 1) {
        alert('More than one post with this title exist');
        displayRequested(post)
        requestName.value = '';
        localforage.setItem('next index', 0)
      }
      else if (post.length === 0) {
        return;
      }
      else {
        displayRequested(post)
        requestName.value = '';
        localforage.setItem('next index', 0)
      }
    })
  }
}

localforage.setItem('next index', 0)


requestNextPostButton.onclick = () => {
  localforage.getItem('next index', (err, res) => {
    if (err) {
      console.log(err)
    }
    else {
      localforage.getItem('next index', (err, index) => {
        localforage.getItem('posts', (err, posts) => {
          if (posts.length === index) {
            return;
          }
          else {
            displayRequestedNext(posts[index]);
            const newIndex = index + 1;
            localforage.setItem('next index', newIndex, (err) => {if (err) console.log(err)})
          }
        })
      })
    }
  })
}