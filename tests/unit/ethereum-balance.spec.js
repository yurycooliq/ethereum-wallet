import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import EthereumBalance from '../../src/components/EthereumBalance.vue';

describe('EthereumBalance.vue', () => {
  const address = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D';
  let component;

  beforeEach(() => {
    component = shallowMount(EthereumBalance, {
      propsData: { address },
    });
  });

  it('renders props.address when passed', () => {
    expect(component.text()).to.include(address);
  });
});
