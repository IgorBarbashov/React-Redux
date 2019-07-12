import React, { Component } from 'react';
import Column from '../column';
import './Table.css';

class Table extends Component {
// constructor(props) { // констурктор не нужен если стрелочная функция
//     super(props);
//     this.renderColumn = this.renderColumn.bind(this);
// }

renderColumn = (el, i) => { // через стрелочную функцию
    return <Column
    key={i}    
    data={el}
        onClick={() => this.props.onClickFromTable(i)}
    />
}


// renderColumn(el) { // через биндер в конструктое
//     return <Column 
//             data={el}
//             onClick={this.props.onClickColumn}
        
//     />
// }

render() {
        return (
            <div className="table">
            {/* {this.props.field} */}

            {this.props.field.map(this.renderColumn)}
 
             {/* <Column data={this.props.field[0]} />
             <Column data={this.props.field[1]} />
             <Column data={this.props.field[2]} />
             <Column data={this.props.field[3]} />
             <Column data={this.props.field[4]} />
             <Column data={this.props.field[5]} />
             <Column data={this.props.field[6]} /> */}
             
            
            </div>

        );
        
    }
}

export default Table;