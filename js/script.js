//Fetch joke

document.getElementById("run").addEventListener("click",function() {

  fetch('https://joke3.p.rapidapi.com/v1/joke', {"method": "GET",
    "headers": {
      "x-rapidapi-key": "6af734d46amsha7a8a22904adf6fp17db84jsn3f19ce9cafcb",
      "x-rapidapi-host": "joke3.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
        let randomJoke = [];
        [data.content].forEach(element => {
          randomJoke.push(element);
          });
        // alert(randomJoke);
        document.getElementById("replacebyjoke").innerHTML = randomJoke;
      })
    .catch(error => {
      console.log('Request failed', error);
    }); 
})


/* Choreographer */

let wrapperNode = document.getElementById('wrapper')
let scrollDownNode = document.querySelector('.scroll-down')
let linkNodes = document.querySelector('.links')

let vh = window.innerHeight
let fin = wrapperNode.clientHeight - vh + linkNodes.clientHeight

function calculateAnimations() {
  return [
    /* L */
    { range: [-1, fin * 0.5],   selector: '.l', type: 'scale', style: 'transform:translateY', from: 0, to: 25, unit: 'px' },
    { range: [fin * 0.5, fin],  selector: '.l', type: 'scale', style: 'transform:translateY', from: 25, to: 0, unit: 'px' },
    { range: [fin * 0.4, fin],  selector: '.l', type: 'change', style: 'color', to: '#f0932b' },

    /* E */
    { range: [-1, fin * 0.5],   selector: '.e', type: 'scale', style: 'transform:scaleX', from: 1, to: 0.5 },
    { range: [-1, fin * 0.5],   selector: '.e', type: 'scale', style: 'transform:scaleY', from: 1, to: 0.5 },
    { range: [fin * 0.5, fin],  selector: '.e', type: 'scale', style: 'transform:scaleX', from: 0.5, to: 1 },
    { range: [fin * 0.5, fin],  selector: '.e', type: 'scale', style: 'transform:scaleY', from: 0.5, to: 1 },
    { range: [fin * 0.3, fin],  selector: '.e', type: 'change', style: 'color', to: '#eb4d4b' },

    /* T */
    { range: [fin * 0.1, fin],  selector: '.t', type: 'randomizeColor' },

    /* ' */
    { range: [-1, fin * 0.5],   selector: '.ap', type: 'scale', style: 'transform:rotateX', from: 0, to: 90, unit: 'deg' },
    { range: [fin * 0.5, fin],  selector: '.ap', type: 'scale', style: 'transform:rotateX', from: 90, to: 0, unit: 'deg' },
    { range: [fin * 0.3, fin],  selector: '.ap', type: 'change', style: 'color', to: '#eb4d4b' },

    /* J */
    { range: [fin * 0.3, fin],  selector: '.j', type: 'change', style: 'color', to: '#ff7979' },

    /* O */
    { range: [-1, fin * 0.5],   selectors: ['.o'], type: 'scale', style: 'transform:rotateZ', from: 0, to: 180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.o'], type: 'scale', style: 'transform:rotateZ', from: 180, to: 360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selectors: ['.o'], type: 'change', style: 'color', to: '#f0932b' },

    /* K */
    { range: [-1, fin * 0.5],   selectors: ['.k', '.s'], type: 'scale', style: 'transform:rotateZ', from: 0, to: -180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.k', '.s'], type: 'scale', style: 'transform:rotateZ', from: -180, to: -360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selectors: ['.k', '.s'], type: 'change', style: 'color', to: '#eb4d4b' },

    /* ! */
    { range: [-1, fin * 0.5],   selector: '.ex', type: 'scale', style: 'transform:translateX', from: 0, to: 10, unit: 'px' },
    { range: [fin * 0.5, fin],  selector: '.ex', type: 'scale', style: 'transform:translateX', from: 10, to: 0, unit: 'px' },
    { range: [fin * 0.4, fin],  selector: '.ex', type: 'change', style: 'color', to: '#ff7979' },

    /* line */
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'width', from: 0.01, to: 25, unit: '%' },
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'opacity', from: 0, to: 1 },

    /* arrow */
    { range: [0.6 * fin, fin], selector: '.scroll-down', type: 'scale', style: 'opacity', from: 1, to: 0 },
    { range: [fin - 30, fin],   selector: '.scroll-down', type: 'change', style: 'display', to: 'none' },

    /* links */
    { range: [0.8 * fin, fin], selector: '.links', type: 'scale', style: 'opacity', from: 0, to: 1 }
  ]
}

let choreographer = new Choreographer({
  animations: calculateAnimations(),
  customFunctions: {
    randomizeColor: function(data) {
      var chars = '0123456789abcdef'.split('')
      var hex = '#'

      while (hex.length < 7) {
        hex += chars[Math.round(Math.random() * (chars.length - 1))]
      }

      data.node.style.color = hex
    }
  }
})

function animate() {
  var scrollPosition = (wrapperNode.getBoundingClientRect().top - wrapperNode.offsetTop) * -1
  choreographer.runAnimationsAt(scrollPosition)
}

document.body.addEventListener('scroll', animate)

animate()

window.addEventListener('resize', function() {
  choreographer.updateAnimations(calculateAnimations())
})