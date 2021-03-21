import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';
import '@cypress/react/support';
import './commands';
import { configure } from '@testing-library/cypress'
configure({ testIdAttribute: 'data-testid' });