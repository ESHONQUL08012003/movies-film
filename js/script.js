movies.splice(42);

const allMovies = movies.map((e) => {
  return {
    title: e.title,
    year: e.year,
    category: e.categories,
    id: e.imdbId,
    rating: e.imdbRating,
    time: `${Math.trunc(e.runtime / 60)} soat ${e.runtime % 60} daqiqa`,
    lang: e.language,
    yotube: `https://www.youtube.com/embed/${e.youtubeId}`,
    summary: e.summary,
    smallImg: e.smallThumbnail,
    largeImg: e.bigThumbnail,
  };
});

/* render function*/
function renderAllMovies() {

  allMovies.forEach((e) => {
    const card = createElement(
      "div",
      "card bg",
      `
  <img src="${e.smallImg}" alt="rasm" class="card-img">
  <div class="card-body">
      <h5 class="card-title text-white fs-3">${e.title}</h5>
      <p class="card-paragrft"><strong class="text-black">catagory:</strong>${e.category}</p>
      <div class="d-flex justify-content-between align-items-center">
       <a href="${e.yotube}" target="_blank" class="btn btn-danger">YouTube </a>
       <button data-id=${e.id} class="btn btn-primary modal-open">more</button>
       <a class="btn bg-success bookmark text-white" data-bookmark=${e.id}>
        <i  data-bookmark=${e.id}  class="bookmark far fa-bookmark"></i>
       </a>
      </div>

  </div>

`
    );

    card.dataset.moieId = e.id;

    $(".films-content").appendChild(card);
  });
}

renderAllMovies();

/* render function end*/

function dynamicCategory() {
  let category = [];
  allMovies.forEach((e) => {
    e.category.forEach((e) => {
      if (!category.includes(e)) {
        category.push(e);
      }
    });
  });

  category.sort();

  category.forEach((e) => {
    const option = createElement("option", "item-c", e);
    $("#category_sort").appendChild(option);
  });


}

dynamicCategory();

const findFilm = (str, rat, ctg) => {
  return allMovies.filter((e) => {
    return e.title.match(str) && e.rating >= rat && e.category.includes(ctg);
  });
};

$(".btn-success").addEventListener("click", () => {
  
  $(".films-content").innerHTML = `
    <div class="loading rounded ">
      <button class="btn btn-outline-info" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
         Loading...
      </button>
    </div>
    `;
  const searchValue = $("#searchInput").value.toLowerCase().trim();
  const ratingFilm = $("#rating").value;
  const categorySort = $("#category_sort").value;

  const searchtext = new RegExp(searchValue, "gi");

  const searchResult = findFilm(searchtext, ratingFilm, categorySort);

  setTimeout(() => {
    $(".films-content").innerHTML = "";
    renderSearchResult(searchResult);
    console.log(searchResult);
  },2000);
});

// ============ ====== ====== ====== FIND FILMS END ====== ====== ====== ====== ====== ====//

// function renderSearchInput(data) {
  
//   let searchInput = $("#searchInput").value.toLowerCase().trim();
//   $(".films-content").innerHTML = "";
//   let films = [];
//   data.forEach((e) => {
//     if (e.title.toLowerCase().includes(searchInput)) {
//       films.push(e);
//     }
//   });
//   renderAllMovies(films);
 
// }

function renderSearchResult(data = []) {

  data.forEach((e) => {
    const card = createElement(
      "div",
      "card shadow",
      `
  
  <img src="${e.smallImg}" alt="rasm" class="card-img">
  <div class="card-body">
      <h5 class="card-title text-black">${e.title}</h5>
      <p class="card-paragrft">catagory:${e.category}</p>
    
    <div class="d-flex justify-content-between align-items-center">
       <a href="${e.yotube}" target="_blank" class="btn btn-danger">YouTube </a>
       <button data-id=${e.id} class="btn btn-primary modal-open">more</button>
       <a class="btn bg-success bookmark text-white" data-bookmark=${e.id}>
        <i  data-bookmark=${e.id}  class="bookmark far fa-bookmark"></i>
       </a>
      </div>

  </div>

`
    );

    $(".films-content").appendChild(card);
  });
}

//  ---------------------- MODAL WINDOW --------------------------

//closeBtn

$("#close").addEventListener("click", () => {
  $(".modal-contents").classList.add("d-none");
});

//  ---------------------- MODAL WINDOW SHOW --------------------------

function modalWindow(id) {
  $(".wrap").innerHTML = "";
  const filmItem = allMovies.filter((e) => {
    return e.id === id;
  });
  const data = filmItem[0];
  console.log(data);

  const contents = createElement(
    "div",
    "content-film",
    `
      <div class="card bg">
        <img src="${data.smallImg}" height="100" alt="rasm" class="card-imgs rounded img-fluid">

      <div class="card-body">
      <h5 class="text-white card-title">${data.title}</h5>
     <p class="card-paragrfts">${data.summary}</p>
      </div>
  </div>
  
  `
  );

  $(".wrap").appendChild(contents);
}

//  ---------------------- MODAL WINDOW SHOW END ---------------------

// ---------------BOOKMARK ITEM ADD -------------------

const bookmark = [];

function addBookmark(id) {
  $(".bookmarks").innerHTML = "";

  const el = allMovies.filter((element) => {
    return element.id === id;
  });
  
  console.log(el);
  if (!bookmark.includes(el[0])) {
    bookmark.push(el[0]);
  } else {
    $(".bookmarkModal").classList.add("d-flex");
    $(".closeModal").addEventListener("click", ()=>{
      $(".bookmarkModal").classList.remove("d-flex");
    })
  }

  if (bookmark.length > 0) {
    bookmark.forEach((e) => {
      const item = createElement(
        "div",
        "card mb-2",
        `
      <div class="p-3">
        <div class="d-flex gap-3 ">
         <div><img class="rounded" src="${e.smallImg}" alt="card-img" width="90px" height="100px"></div>
          <div>
            <p class="bookmark-paragrft">${e.summary}</p>
          </div>
          </div>
      </div>
      `
      );
      $(".bookmarks").appendChild(item);
    });
  }
}

$(".films-content").addEventListener("click", (e) => {
  if (e.target.matches(".bookmark")) {
    addBookmark(e.target.getAttribute("data-bookmark"));
  }
});

//--------------- MODAL ---------------//
window.addEventListener("click", (e) => {
  if (e.target.matches("modal-contents")) {
    $(".modal-content").classList.toggle("shadow-lg");
  }

  if (e.target.classList.contains("modal-open")) {
    $(".modal-contents").classList.remove("d-none");
    console.log(e.target.getAttribute("data-id"));
    modalWindow(e.target.getAttribute("data-id"));
  }
});

//  ---------------------- MODAL WINDOW END--------------------------
