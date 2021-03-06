import core from '@pluralsight/ps-design-system-core'

import { AsideLayout as vars } from '../vars'

export default {
  ['.psds-aside-layout']: {
    display: 'flex'
  },
  [`.psds-aside-layout--aside-position-${vars.asidePositions.first}`]: {
    flexDirection: 'column'
  },
  [`.psds-aside-layout--aside-position-${vars.asidePositions.last}`]: {
    flexDirection: 'column-reverse'
  },
  [`.psds-aside-layout__aside--aside-position-${vars.asidePositions
    .first}`]: {
    marginBottom: core.layout.spacingMedium
  },
  [`.psds-aside-layout__aside--aside-position-${vars.asidePositions
    .last}`]: {
    marginTop: core.layout.spacingMedium
  },
  '@media (min-width: 769px)': {
    [`.psds-aside-layout--aside-position-${vars.asidePositions.first}`]: {
      flexDirection: 'row'
    },
    [`.psds-aside-layout--aside-position-${vars.asidePositions.last}`]: {
      flexDirection: 'row-reverse'
    },
    ['.psds-aside-layout__aside']: {
      width: 'calc(33.34%)'
    },
    [`.psds-aside-layout__aside--aside-position-${vars.asidePositions
      .first}`]: {
      marginBottom: 0,
      marginRight: core.layout.spacingMedium
    },
    [`.psds-aside-layout__aside--aside-position-${vars.asidePositions
      .last}`]: {
      marginTop: 0,
      marginLeft: core.layout.spacingMedium
    },
    ['.psds-aside-layout__main']: {
      width: 'calc(66.66%)'
    }
  }
}
