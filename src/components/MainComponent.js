import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes , fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
// import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
    // resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
})

class Main extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  componentDidMount(){
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();

  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
}

  render() {
      const HomePage = (props) => {
          return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading = {this.props.dishes.isLoading}
          dishesError = {this.props.dishes.errMessage}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading = {this.props.promotions.isLoading}
          promosErrMess = {this.props.promotions.errMessage}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading ={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMessage}/>
          );
      }

      const DishWithId = ({match}) => {
          return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading = {this.props.dishes.isLoading}
                errMessage = {this.props.dishes.errMessage}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess = {this.props.comments.errMessage}
                postComment={this.props.postComment}/>
          );

      }
    //   const Contactus = (props) => {
    //       return(
    //           <Contact/>
    //       );
    //   }
    return (
      <div className="App">
      <Header/>
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/> }/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback}/>}/>
                    <Redirect to="/home"/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
      {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>  */}
      {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
      <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

//dishes have became as props to mENU COMPONENT 
//AND can be accessed anywhere inside the component
// to render onto the browser screen. 
