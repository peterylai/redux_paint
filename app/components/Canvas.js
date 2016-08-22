import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Pixel from './Pixel';
import { paintPixel, startPainting, stopPainting } from '../actions/index';

const Canvas = ({ grid, handleMouseOver, handleMouseDown, handleMouseUp }) => {
  const pixels = grid.map((row, r) => {
    const pixelRow = row.map((color, c) => (
      <Pixel key={`r${r}c${c}`} color={color} onMouseOver={() => handleMouseOver(r, c)} />
    ));
    return <div>{pixelRow}</div>;
  });
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {pixels}
    </div>
  );
};

Canvas.propTypes = {
  grid: PropTypes.array.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  grid: state.grid,
});

const mapDispatchToProps = (dispatch) => ({
  handleMouseOver: (row, col) => dispatch(paintPixel(row, col)),
  handleMouseDown: () => dispatch(startPainting()),
  handleMouseUp: () => dispatch(stopPainting()),
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;