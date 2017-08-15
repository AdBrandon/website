import React from 'react';
import {connect} from 'react-redux'
import {Row} from 'antd';
import {mapStateToProps_site, mapDispatchToProps_site} from '../../redux/connet'
import CardsBoxComponent from "./cards_box"

class SiteComponent extends React.Component {
    componentWillMount() {
        this.props.getFullSite()
    }

    componentDidUpdate() {
        this.props.getSite(this.props.match.params.classes, this.props.path, this.props.fullSite)
    }

    render() {
        return (
            <Row className={this.props.match.params.classes}>
                <CardsBoxComponent sites={this.props.pathSite || []} classes={this.props.match.params.classes}/>
            </Row>
        )
    }
}


export default connect(mapStateToProps_site, mapDispatchToProps_site)(SiteComponent)
