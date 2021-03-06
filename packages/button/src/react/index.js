import core from '@pluralsight/ps-design-system-core'
import * as glamor from 'glamor'
import glamorous from 'glamorous'
import { sizes as iconSizes } from '@pluralsight/ps-design-system-icon/react'
import PropTypes from 'prop-types'
import React from 'react'
import { names as themeNames } from '@pluralsight/ps-design-system-theme/react'
import { transparentize } from 'polished'

export const appearances = {
  primary: 'primary',
  stroke: 'stroke',
  flat: 'flat'
}

export const sizes = {
  xSmall: 'xSmall',
  small: 'small',
  medium: 'medium',
  large: 'large'
}

export const iconAligns = { left: 'left', right: 'right' }

const styleSize = ({ size }) =>
  ({
    [sizes.xSmall]: {
      fontSize: core.type.fontSizeXSmall,
      lineHeight: core.type.lineHeightStandard,
      padding: `0 ${core.layout.spacingXSmall}`,
      height: '24px'
    },
    [sizes.small]: {
      fontSize: core.type.fontSizeSmall,
      lineHeight: core.type.lineHeightStandard,
      padding: `${core.layout.spacingXXSmall} ${core.layout.spacingXSmall}`,
      height: '32px'
    },
    [sizes.medium]: {
      fontSize: core.type.fontSizeSmall,
      lineHeight: core.type.lineHeightStandard,
      padding: `${core.layout.spacingXXSmall} ${core.layout.spacingMedium}`,
      height: '40px'
    },
    [sizes.large]: {
      fontSize: core.type.fontSizeMedium,
      lineHeight: core.type.lineHeightExtra,
      padding: `${core.layout.spacingXXSmall} ${core.layout.spacingMedium}`,
      height: '48px'
    }
  }[size])

const styleAppearance = ({ appearance, themeName }) =>
  ({
    [appearances.stroke]: {
      border: `1px solid ${core.colors.orange}`,
      color: core.colors.orange,
      background: 'none',
      ':hover': {
        border: `1px solid ${core.colors.orangeLight}`,
        color: core.colors.orangeLight,
        background: 'none'
      }
    },
    [appearances.flat]: {
      border: 'none',
      color:
        themeName === themeNames.light
          ? core.colors.gray03
          : core.colors.gray02,
      background: 'none',
      ':hover':
        themeName === themeNames.light
          ? {
              background: transparentize(0.85, core.colors.gray03)
            }
          : {
              color: core.colors.white,
              background: transparentize(0.85, core.colors.white)
            }
    }
  }[appearance])

const styleDisabled = ({ disabled, appearance }) =>
  disabled
    ? {
        color: core.colors.gray02,
        background: core.colors.gray03,
        ':hover': { color: core.colors.gray02, background: core.colors.gray03 }
      }
    : null

const styleDisabledStroke = ({ disabled, appearance }) =>
  disabled && appearance === 'stroke'
    ? {
        border: 'none',
        ':hover': {
          border: 'none'
        }
      }
    : null

const styleDisabledFlat = ({ disabled, appearance }) =>
  disabled && appearance === 'flat'
    ? {
        opacity: 0.4,
        background: 'none',
        ':hover': { color: core.colors.gray02, background: 'none' }
      }
    : null

const styleIcon = ({ icon, iconAlign, iconOnly, size }) =>
  icon && !iconOnly
    ? {
        [iconAlign === iconAligns.right ? 'paddingRight' : 'paddingLeft']:
          size === sizes.large
            ? core.layout.spacingSmall
            : core.layout.spacingXSmall
      }
    : null

const styleIconAlign = ({ iconAlign }) =>
  iconAlign === iconAligns.right ? { flexDirection: 'row-reverse' } : null

const styleIconOnly = ({ iconOnly, size }) =>
  iconOnly
    ? {
        padding: 0,
        width: {
          [sizes.xSmall]: '24px',
          [sizes.small]: '32px',
          [sizes.medium]: '40px',
          [sizes.large]: '48px'
        }[size]
      }
    : null

const getButtonStyles = props =>
  glamor.css(
    {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: `${core.layout.spacingSmall} ${core.layout.spacingMedium}`,
      border: 0,
      borderRadius: 2,
      fontSize: core.type.fontSizeSmall,
      lineHeight: core.type.lineHeightStandard,
      fontWeight: core.type.fontWeightMedium,
      textAlign: 'center',
      color: core.colors.white,
      background: core.colors.orange,
      cursor: 'pointer',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textDecoration: 'none',
      transition: `all ${core.motion.speedNormal}`,
      ':hover': {
        background: core.colors.orangeLight
      }
    },
    styleSize(props),
    styleAppearance(props),
    styleDisabled(props),
    styleDisabledStroke(props),
    styleDisabledFlat(props),
    styleIcon(props),
    styleIconAlign(props),
    styleIconOnly(props),
    props.css
  )

const styleIconAlignIconContainer = ({ iconAlign }) =>
  iconAlign === iconAligns.right
    ? {
        marginLeft: core.layout.spacingXSmall,
        marginRight: 0
      }
    : {
        marginLeft: 0,
        marginRight: core.layout.spacingXSmall
      }

const styleIconOnlyIconContainer = ({ iconOnly }) =>
  iconOnly ? { justifyContent: 'center', width: '100%', margin: 0 } : null

const IconContainer = glamorous.div(
  {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100%'
  },
  styleIconAlignIconContainer,
  styleIconOnlyIconContainer
)

const mapIconSize = props => {
  const btnToIconSizes = {
    [sizes.xSmall]: iconSizes.small,
    [sizes.small]: iconSizes.medium,
    [sizes.medium]: iconSizes.medium,
    [sizes.large]: iconSizes.medium
  }
  return btnToIconSizes[props.size]
    ? btnToIconSizes[props.size]
    : iconSizes.medium
}

const rmNonHtmlProps = props => {
  const {
    appearance,
    icon,
    iconAlign,
    iconOnly,
    innerRef,
    size,
    themeName,
    ...rest
  } = props
  return rest
}

const renderIcon = props =>
  props.icon ? (
    <IconContainer
      iconAlign={props.iconAlign}
      iconOnly={React.Children.count(props.children) <= 0}
    >
      {React.cloneElement(props.icon, {
        size: mapIconSize(props)
      })}
    </IconContainer>
  ) : null

const BtnText = glamorous.span({
  display: 'inline-flex',
  alignItems: 'center'
})

const buttonHtmlPropsWhitelist = [
  'href',
  'onClick',
  'disabled',
  'className',
  'style',
  'title',
  /^aria-/,
  /^data-/
]

const isPropInWhitelist = (whitelist, key) =>
  whitelist.some(
    regex =>
      typeof regex === 'string' ? new RegExp(regex).test(key) : regex.test(key)
  )
const whitelistProps = (props, whitelist) =>
  Object.keys(props).reduce((newProps, key) => {
    if (isPropInWhitelist(whitelist, key)) newProps[key] = props[key]
    return newProps
  }, {})

class Button extends React.Component {
  render() {
    return React.createElement(
      this.props.href ? 'a' : 'button',
      {
        ...(this.props.innerRef ? { ref: this.props.innerRef } : {}),
        ...getButtonStyles(this.props),
        ...whitelistProps(this.props, buttonHtmlPropsWhitelist)
      },
      this.props.children
    )
  }
}

const Btn = (props, context) => (
  <Button
    {...props}
    themeName={context.themeName}
    iconOnly={React.Children.count(props.children) <= 0}
  >
    {renderIcon(props)}
    <BtnText>{props.children}</BtnText>
  </Button>
)

Btn.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(appearances)),
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  iconAlign: PropTypes.oneOf(Object.keys(iconAligns)),
  innerRef: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizes))
}
Btn.defaultProps = {
  appearance: appearances.primary,
  disabled: false,
  size: sizes.medium
}
Btn.contextTypes = {
  themeName: PropTypes.string
}

Btn.appearances = appearances
Btn.iconAligns = iconAligns
Btn.sizes = sizes

export default Btn
