const $ = n => document.querySelector(n);
const localforage = require('localforage')
// "predeploy": "rm -rf dist && parcel build index.html --public-url github.com/vicradon/localforage-demo",

const nodes = {
  enterTitle: $('.enter-title'),
  enterContent: $('.enter-content'),
  submitPost: $('.submit-post'),
  normalPostFlow: $('.normal-post-flow'),
}

const { enterTitle,
  enterContent,
  submitPost,
  normalPostFlow
} = nodes;

function deletePost(id) {
  localforage.getItem('posts', (err, posts) => {
    const newPosts = posts.filter(x => x.id !== +id);
    localforage.setItem('posts', newPosts, (err) => {
      if (err) console.log(err);
      displayPosts();
    })
  })
}

function editPost(id) {
  localforage.getItem('posts', (err, posts) => {
    const post = posts.filter(post => post.id === +id)[0];
    const newPosts = posts.filter(x => x.id !== +id);
    localforage.setItem('posts', newPosts, (err) => {
      if (err) console.log(err)
    })
    enterTitle.value = post.title;
    enterContent.value = post.content;
  })
}

normalPostFlow.onclick = ({ target }) => {
  if (target.classList.contains('edit-post')) {
    const post = target.parentNode.parentNode;
    post.classList.add('edit-true')
    document.querySelectorAll('.edit-post').forEach(post => {
      post.setAttribute("disabled", true)
    })
    document.querySelectorAll('.delete-post').forEach(post => {
      post.setAttribute("disabled", true)
    })
    editPost(post.dataset.id)
  }
  else if (target.classList.contains('delete-post')) {
    const post = target.parentNode.parentNode;

    post.classList.add('scale-down-center')
    post.addEventListener('animationend', () => {
      deletePost(post.dataset.id)
    })
  }
}

function postComp(title, content, id) {
  let stuff = '';
  if (content.split(' ').length > 5) {
    stuff = content.split(' ').slice(0, 5).join(' ');
    let temparr = stuff.split(' ')[4].split('');
    let other = stuff.split(' ').slice(0, 4).join(' ');
    if (temparr[temparr.length - 1] === ',') {
      const index = temparr.findIndex(x => x === ',');
      temparr.splice(index, 1)
      stuff = `${other} ${temparr.join('')}`;
    }
    stuff = `${stuff}...`
  }
  else { stuff = content }

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
function init() {
  localforage.getItem('posts', (err, res) => {
    if (res === null) {
      localforage.setItem('posts', [])
    }
    else if (err) {
      console.log(err)
    }
    else {
      displayPosts();
    }
  })
}

init()

submitPost.onclick = () => {
  if (enterTitle.value.trim().length !== 0 && enterContent.value.trim().length !== 0) {
    localforage.getItem('posts', (err, posts) => {
      if (err) {
        console.log(err)
        return;
      }
      else {
        let id = 1;
        if (posts.length > 0) {
          id = Math.max(...posts.map(x => x.id)) + 1;
        }
        const newPost = {
          title: enterTitle.value.trim(),
          content: enterContent.value.trim(),
          id
        }
        const newPosts = [...posts, newPost]
        localforage.setItem('posts', newPosts, (err, posts) => {
          if (err) {
            console.log(err)
          }
          displayPosts();
          enterTitle.value = '';
          enterContent.value = '';
        })
      }
    })
  }
}

function displayPosts() {
  localforage.getItem('posts', (err, posts) => {
    if (err) {
      console.log(err)
      return;
    }
    else {
      let a = '';
      if (posts !== null && posts.length > 0) {
        posts.forEach(x => a += postComp(x.title, x.content, x.id))
      }
      normalPostFlow.innerHTML = a;
    }
  })
}
