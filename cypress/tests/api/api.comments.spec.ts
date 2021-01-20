/// <reference types="react-scripts" />

const apiUrl = Cypress.env('apiUrl');

describe('Comments api tests', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
  });

  // GIVEN I am logged user AND I get the list of articles
  // WHEN I pick the first article AND execute api call to add a comment
  // THEN the article will have new comment
  // WHEN I get the list of comments and delete the last one
  // THEN the comment won't exist
  it('[CD-T14] Add and delete comment', () => {
    // get the list of articles
    cy.request('GET', `${apiUrl}/articles?limit=10&offset=0`).then((list) => {
      expect(list.status).to.eq(200);

      // pick up the first article's url
      var slug = list.body.articles[0].slug;

      // call the first article api
      cy.request('GET', `${apiUrl}/articles/${slug}`).then((article) => {
        expect(article.status).to.eq(200);

        // check the url of arcicle is the same as the article's we choosed from the list
        expect(slug).to.eq(article.body.article.slug);
        // remember count of comments
        cy.getComments(slug).then((comments1) => {
          var count1 = comments1.body.comments.length;
          expect(comments1.status).to.eq(200);

          // push a comment
          cy.postComment(slug);

          // check new comment
          cy.getComments(slug).then((comments2) => {
            var id = comments2.body.comments[0].id;
            var count2 = comments2.body.comments.length;
            expect(comments2.status).to.eq(200);
            expect(count2).to.eq(count1 + 1);

            // delete comment by ID
            cy.deleteComment(slug, id);
            cy.getComments(slug).then((comments3) => {
              var count3 = comments3.body.comments.length;
              var idList = comments3.body.comments.map((item) => item.id);
              expect(comments3.status).to.eq(200);
              expect(count1).to.eql(count3);
              expect(idList).not.contain(id);
            });
          });
        });
      });
    });
  });
});
