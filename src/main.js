import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function () {
  $('#findPokemon').click(function () {
    const name = $('#name').val();


    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`; // This API takes either a number or name (lower case) of the Pokemon.


      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response)
        }
      }
      request.open("GET", url, true);
      request.send();
    });


    promise.then(function (response) {
      const body = JSON.parse(response)
      $('.showName').text(`Say hello to ${body.species.name}!`);
      $('.showSprite').html(`<img src=${body.sprites.front_default}></img>`);
      $('.showHeight').text(`${body.species.name} is ${body.height} units tall!`);
      $('.showType').text(`${body.species.name} is ${body.types[0].type.name} type!`);
      $('.showFirstAbility').html(`${body.species.name} knows the move ${body.abilities[0].ability.name}`);
    }, function (error) {
      $('.showName').text(`You searched for ${name}, but there were no results! Error: ${error}`);
      $('.showSprite').html(`<div></div>`);
      $('.showHeight').text("");
      $('.showType').text("");
      $('.showFirstAbility').html(`<div></div>`);

    });
  });
});