import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    const name = $('#name').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    console.log(name)

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function (response) {
      $('.showName').text(`Say hello to ${response.species.name}!`);
      $('.showSprite').html(`<img src=${response.sprites.front_default}></img>`);
      $('.showHeight').text(`${response.species.name} is ${response.height} units tall!`);
      $('.showType').text(`${response.species.name} is ${response.types[0].type.name} type!`);
      $('.showFirstAbility').html(`${response.species.name} knows the move ${response.abilities[0].ability.name}`);

    }
  });
});