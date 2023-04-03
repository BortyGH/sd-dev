import React from 'react'
import PropTypes from 'prop-types'

const DIRECTION = Object.freeze({
  ROW: 'row',
  COLUMN: 'column'
})

const POSITION = Object.freeze({
  START: 'flex-start',
  CENTER: 'center',
  BASELINE: 'baseline',
  END: 'flex-end',
  SPC_BETWEEN: 'space-between',
  SPC_AROUND: 'space-around',
  SPC_EVENLY: 'space-evenly'
})

export const Flex = ({
  direction,
  flex,
  wrap,
  children,
  justify,
  align,
  stretch,
  grow
}) => (
  <div
    style={{
      display: 'flex',
      flex: flex,
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      width: direction === DIRECTION.ROW && stretch ? '100%' : 'auto',
      height: direction === DIRECTION.COLUMN && stretch ? '100%' : 'auto',
      ...(grow && { flexGrow: grow })
    }}
  >
    {children}
  </div>
)

Flex.propTypes = {
  direction: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.node,
  stretch: PropTypes.bool,
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
Flex.defaultProps = {
  direction: DIRECTION.ROW,
  flex: '0 1 auto',
  justify: 'normal',
  align: 'normal',
  wrap: 'no-wrap',
  stretch: false,
  grow: 0
}

Flex.DIRECTION = DIRECTION
Flex.POSITION = POSITION
