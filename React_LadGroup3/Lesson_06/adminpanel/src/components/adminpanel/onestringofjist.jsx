import React, { Component } from "react";
import Context from '../../context/content';
import PropTypes from 'prop-types';

class OneStringOfList extends Component {
    constructor() {
        super();
        this.state={
            name: "",
            slug: "",
            description: ""
        }
    }

    componentDidMount() {
        this.setState( {
            name: this.props.page.name,
            slug: this.props.page.slug,
            description: this.props.page.description
        } );
    }

    onChange = (event) => {
        switch(event.target.id) {
            case "1":
                this.setState( {name: event.target.value} );
                break;
            case "2":
                this.setState( {slug: event.target.value} );
                break;
            case "3":
                this.setState( {description: event.target.value} );
                break;
            default: break;
        }
    }

    render() {
        return (
            <Context.Consumer>
            { context => {
            return (

            <div className={"string " + (this.props.isCurrent ? "current-string" : "ordinary-string") }>
                <div className="str-footer">
                    <div className="str-footer-filed">ID: {this.props.page.id}</div>
                    <div className="str-footer-filed">createdAt: {this.props.page.createdAt}</div>
                    <div className="str-footer-filed">updatedAt: {this.props.page.updatedAt}</div>
                </div>

                <div className="str-header">
                    <div className="str-header-field">Name</div>
                    <div className="str-header-field">Slug</div>
                    <div className="str-header-field">Description</div>
                </div>
                
                <div className="str-header">
                    <div className="str-header-field">
                        <input id="1" type="text" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    
                    <div className="str-header-field">
                        <input  id="2" type="text" value={this.state.slug} onChange={this.onChange}/>
                    </div>
                    
                    <div className="str-header-field">
                        <input id="3" type="text" value={this.state.description} onChange={this.onChange}/>
                    </div>
                    
                    <div className="no-wrap">
                        <div className="str-header-button"
                            onClick={ () => context.updateCRUD(this.props.page.id,
                                {name: this.state.name, slug: this.state.slug, description: this.state.description}
                            )}>[Обновить]</div>
                        <div className="str-header-button" onClick={()=>context.deleteCRUD(this.props.page.id)}>[Удалить]</div>
                    </div>
                </div>
                
                <hr/>
                <div className="new-warning">
                    <div className="str-warning">При нажатии на кнопку [Новая страница], на сервере будет создана новая страница на основе данных введенных в поля.
                    Текущий ID при этом не учитывается. Сервер выдаст новой странице свой уникальный ID.</div>
                    <div className="text-red" onClick={()=>context.createCRUD(
                        {name: this.state.name, slug: this.state.slug, description: this.state.description}
                        )}>[Новая страница]
                    </div>
                </div>

            </div>

            ); } }
            </Context.Consumer>
        );
    }
}

OneStringOfList.propTypes = {
    page: PropTypes.object.isRequired,
    isCurrent: PropTypes.bool.isRequired
}

export default OneStringOfList;