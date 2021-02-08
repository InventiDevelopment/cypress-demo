import React from 'react';
import { mount } from '@cypress/react';
import Tags from '../../../src/components/Home/Tags';
import { PopularTags } from '../../support/pageObjects/popularTags';

describe('Component tests for tags component', () => {
  //GIVEN I am a not logged user
  //AND I land to the base page with articles
  //WHEN my app gets only x articles from server
  //THEN I can see only x articles on the page
  it('[CD-T7] - checks count of tags vs fixure file', () => {
    cy.fixture('tagsList').then((testdata) => {
      cy.log(`***Tags component should show these tags:*** ${testdata.tags}`);
      mount(<Tags tags={testdata.tags} />);
      PopularTags.getAllTags().should('have.length', testdata.tags.length);

      //PopularTags.getAllTags()[0].should('contains','aaa')
      let i = 0;
      testdata.tags.forEach((tag) => {
        PopularTags.getNthTag(i++).should('have.text', tag);
      });
    });
  });
});
