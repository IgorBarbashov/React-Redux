import React, { Component } from "react";
import AskAuth from "../authwindow/askauth";
import ShowAuth from "../authwindow/showauth";
import AdminButtons from "./adminbuttons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./pathtree.css";

class PathTree extends Component {

    renderPagesList = (page, i) => {
        return (
        <div key={i} className="no-wrap">
            <div>
                { page.slug ?
                    <Link to={ { pathname: "/" + page.slug, state: {pageID: page.id} } }>
                        <div>{"/" + page.slug}</div>
                    </Link>
                : page.name ?
                    <div >{page.name}</div>
                : <div >{page.id.substring(0, 4) + "..." + page.id.substring(page.id.length-4) }</div>
                }
            </div>
            { this.props.isAuth && !page.slug ? <AdminButtons pageiD={page.id}/> : ""}
        </div>
        );
    }

    render() {
        return (
            <div className="path-tree">
                { this.props.isAuth ? <ShowAuth /> : <AskAuth /> }
                { this.props.pagesList.map(this.renderPagesList) }
                { !this.props.isAuth ? <hr/> : ""}
                <button onClick={this.props.getPagesList}>Обновить список</button>

                <hr/><b>Strapi-server:</b>
                <div><label>
                <input name="strapi-server" type="radio" id="radio1" value="http" 
                    checked={this.props.serverIndex===0} onChange={this.props.changeServer} />http-сервер
                </label></div>
                <div><label>
                <input name="strapi-server" type="radio" id="radio1" value="https"
                    checked={this.props.serverIndex===1} onChange={this.props.changeServer} />https-сервер
                </label></div>
                
                { this.props.pagesList.length === 0 && this.props.isAuth ?
                    <div><hr/><button
                        onClick={()=>this.props.createCRUD({name: "Empty", slug: "Empty", description: "Empty"})}
                    >Создать пустую страницу</button></div>
                    : ""
                }

            </div>
        );
    }
}

PathTree.propTypes = {
    pagesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    isAuth: PropTypes.bool.isRequired,
    getPagesList: PropTypes.func.isRequired,
    changeServer: PropTypes.func.isRequired,
    createCRUD: PropTypes.func.isRequired,
    serverIndex: PropTypes.number.isRequired
}

export default PathTree;