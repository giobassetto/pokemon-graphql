import { gql } from 'apollo-boost';

export const GET_POKEMONS = gql`
  query pokemons($count: Int!) {
    pokemons(first: $count) {
      id,
      number,
      name,
      image,
      types
    }
  }
`;

export const GET_DETAILS_POKEMON = gql`
query Details($id: String!) {
  pokemon(id: $id) {
    id,
    number,
    name,
    image,
    types,
    maxHP,
    resistant,
    attacks {
      special {
        name,
        type,
        damage
      },
    },
    evolutions {
      id,
      number,
      name,
      image,
    },
  }
}`;
