/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var EditorButtons = React.createClass({
  render: function() {
    return (
      <div className='ml2 mr2 mt3 btl'>
        <span className='left'>
          <h5 className='m0 py2 small-caps btd'>Editor</h5>
        </span>
        <span className='right'>
          <h5 className='m0 py2 small-caps light light-gray'>Hide</h5> 
        </span>
        <div className='cf'></div>
        <button className='bg-silver bold w20'>
          <svg width="16px" height='16px' viewBox="0 0 32 32">
              <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                  <g fontSize="32" fontFamily="Playfair Display" fill="#333333" fontWeight="bold">
                      <text>
                          <tspan x="6" y="27">B</tspan>
                      </text>
                  </g>
              </g>
          </svg>
        </button>
        <button className='bg-silver italic w20'>
          <svg width="16px" height='16px' viewBox="0 0 32 32">
              <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                  <g fontSize="32" fontFamily="Playfair Display" fill="#333333" fontWeight="normal">
                      <text>
                          <tspan x="6" y="27">I</tspan>
                      </text>
                  </g>
              </g>
          </svg>
        </button>
        <button className='bg-silver underline w20'>
          <svg width='16px' height='16px' viewBox='0 0 32 32' className='icon'><path d='M0 16 A8 8 0 0 1 8 8 L14 8 A8 8 0 0 1 22 16 L18 16 A4 4 0 0 0 14 12 L8 12 A4 4 0 0 0 4 16 A4 4 0 0 0 8 20 L10 24 L8 24 A8 8 0 0 1 0 16z M22 8 L24 8 A8 8 0 0 1 32 16 A8 8 0 0 1 24 24 L18 24 A8 8 0 0 1 10 16 L14 16 A4 4 0 0 0 18 20 L24 20 A4 4 0 0 0 28 16 A4 4 0 0 0 24 12z  '></path></svg>
        </button>
        <button className='bg-silver regular w20'>
            <svg width="16px" height="16px" viewBox="0 0 32 32" >
                <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                    <g fontFamily="Roboto" fill="#333333" fontWeight="normal">
                        <text fontSize="32">
                            <tspan x="2" y="27">T</tspan>
                        </text>
                        <text fontSize="20">
                            <tspan x="16" y="27">T</tspan>
                        </text>
                    </g>
                </g>
            </svg>
        </button>
        <button className='bg-silver w20'>
          <svg width="32px" height="32px" viewBox="0 0 32 32">
              <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                  <g fontSize="48" fontFamily="Playfair Display" fill="#333" fontWeight="bold">
                      <text>
                          <tspan x="5" y="43">”</tspan>
                      </text>
                  </g>
              </g>
          </svg>
        </button>
      </div>
    );
  }
});

module.exports = EditorButtons;