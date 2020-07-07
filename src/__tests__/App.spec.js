import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import List from '../pages/List';
import Details from '../pages/Details';
import { MockedProvider } from '@apollo/react-testing'
import { Provider } from 'react-redux';
import store from '../store';
import { GET_POKEMONS } from '../config/queries';
import Edit from '../pages/Edit';

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: { count: 1 }
    },
    result: {
      data: {
        pokemons: [
            {
              id: "UG9rZW1vbjowMDE=",
              image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
              name: "Bulbasaur",
              number: "001",
              types: ["Grass", "Poison"],
            },
          ],
          loading: false,
          networkStatus: 7,
          stale: false,
      }
    }
  },
]

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('List', () => {
  it('should be able to list the total pokemons inside the cards', async () => {
      const { getByTestId, getByText } = render(
        <MockedProvider mocks={mocks}>
          <Provider store={store}>
            <List />
          </Provider>
        </MockedProvider>
      );
        expect(getByTestId('loading-page'));
        await actWait(2500);
        expect(getByText("001 - Bulbasaur"));
        expect(getByText("004 - Charmander"));
  });
  it('should be able to seach a pokemon', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Provider store={store}>
          <List />
        </Provider>
      </MockedProvider>
    );
    await actWait(2000);
    const input = document.getElementById('search-input');
    fireEvent.change(input, { target: { value: 'pikachu' }});
    await actWait(1000);
    expect(getByText("025 - Pikachu"));
    expect(getByText("Electric"));
  })
});

describe('Details', () => {
  it('should be able to render details', async () => {
    const props = {
      match: {
        params: {
          id: 'UG9rZW1vbjowMDE=',
        }
      }
    };
      const { getByText } = render(
          <MockedProvider mocks={mocks}>
            <Provider store={store}>
              <Details {...props} />
            </Provider>
          </MockedProvider>
        );
      await actWait(2000);
      expect(getByText("Bulbasaur"));
      expect(getByText("Power Whip"));
      expect(getByText("Seed Bomb"));
  });
});

describe('Edit', () => {
  it('should be able to edit a pokemon', async () => {
    const props = {
      location: {
        state: {
          pokemonInfos: {
            id: "UG9rZW1vbjowMDg=",
            image: "https://img.pokemondb.net/artwork/wartortle.jpg",
            maxHP: 1582,
            name: "Wartortle",
            number: "008",
            resistant: ["Fire", "Water", "Ice", "Steel"],
            types: ["Fire", "Flying"],
            evolutions: [{
              id: "UG9rZW1vbjowMDk=",
              image: "https://img.pokemondb.net/artwork/blastoise.jpg",
              name: "Blastoise",
              number: "009"
            }],
            attacks: {
              special: [
                {
                  damage: 25,
                  name: "Aqua Jet",
                  type: "Water",
                },
                {
                  damage: 65,
                  name: "Gunk Shot",
                  type: "Poison",
                },
                {
                  damage: 90,
                  name: "Hydro Pump",
                  type: "Water",
                },
                {
                  damage: 65,
                  name: "Ice Beam",
                  type: "Ice",
                },
              ]
            }
          },
        }
      }
    };
      const { getByText } = render(
          <MockedProvider mocks={mocks}>
            <Provider store={store}>
              <Edit {...props} />
            </Provider>
          </MockedProvider>
        );
      await actWait(2000);
      const input = document.getElementById('name-input');
      fireEvent.change(input, { target: { value: 'charmandinho' }});
      await actWait(200);
      fireEvent.click(getByText('Salvar'));
      actWait(200);
      expect(getByText("Pokemon editado com sucesso!"));
  });
})