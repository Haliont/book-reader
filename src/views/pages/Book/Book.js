import React from 'react';
import PropTypes from 'prop-types';
import * as $propTypes from '@prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
// import * as appSelectors from '@ducks/app/appSelectors';
import * as appActions from '@ducks/app/appActions';
import * as firestoreActions from '@ducks/firestore/firestoreActions';

import MainLayout from '@layouts/MainLayout';
import Container from '@UI/Container';

import { Typography, Button, Chip } from '@material-ui/core';

import { getBook, canReadBook } from '@ducks/firestore/firestoreSelectors';
import { getIsSignedIn, getUser } from '@ducks/firebase/firebaseSelectors';
import AddBookCommentForm from '@components/AddBookCommentForm';

import BookComments from '@components/BookComments';

import BookRating from '@UI/BookRating';
import Rating from '@UI/Rating';
import getIsVotingBook from '@ducks/firestore/selectors/getIsVotingBook';
import styles from './Book.module.scss';
import Description from './Description';
import { history, getBookAuthorNames } from '@utils/';

function Book({ book, isVotingBook, isSignedIn, canRead, ...other }) {
  const { id, cover, authors, name, description, comments, genres, meta } = book;
  const { openBookAccessRestrictionDialog, deleteBookFromMyBooks, addBookToMyBooks, setBookRating } = other;

  const renderLeft = (
    <div className={styles.left}>
      <img className={styles.image} src={cover} alt={name} />
      <div className={styles.buttons}>
        <Button
          className={styles.readBtn}
          size="large"
          color="primary"
          variant="contained"
          onClick={canRead ? () => history.push(`/reader/${id}`) : openBookAccessRestrictionDialog}
        >
          Читать
        </Button>
        {isSignedIn && !meta.isInLibrary && (
          <Button
            size="large"
            color="primary"
            variant="contained"
            className={styles.addBtn}
            onClick={() => addBookToMyBooks(id)}
          >
            На полку
            <div className={styles.addBtnPlus}>+</div>
          </Button>
        )}
        {isSignedIn && meta.isInLibrary && (
          <Button
            size="large"
            color="secondary"
            variant="contained"
            className={styles.deleteBtn}
            onClick={() => deleteBookFromMyBooks(id)}
          >
            Удалить с полки
            <div className={styles.deleteBtnMinus}>-</div>
          </Button>
        )}
        {isSignedIn && (
          <Rating
            rating={meta.rating}
            isVotingBook={isVotingBook}
            setRating={newRating => setBookRating({ bookId: id, rating: newRating })}
          />
        )}
      </div>
    </div>
  );

  const renderRight = (
    <div className={styles.right}>
      <div className={styles.header}>
        <Typography className={cn(styles.author, styles.headerText)} variant="subheading">
          {getBookAuthorNames(authors)}
        </Typography>
        <Typography className={cn(styles.name, styles.headerText)} variant="headline" paragraph>
          {name}
        </Typography>
        <div style={{ marginBottom: 20 }}>
          <BookRating rating={book.rating} />
        </div>
        <div className={styles.genres}>
          {genres.map(({ id: genreId, name: genreName }) => (
            <Chip key={genreId} variant="default" label={genreName} classes={{ root: styles.genresGenre }} />
          ))}
        </div>
      </div>
      <Description description={description} />
      <div style={{ marginTop: 24 }}>
        {isSignedIn && <AddBookCommentForm bookId={book.id} />}
        <BookComments comments={comments} />
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className={styles.root}>
        <Container className={styles.inner}>
          {renderLeft}
          {renderRight}
        </Container>
      </div>
    </MainLayout>
  );
}

Book.propTypes = {
  book: PropTypes.shape($propTypes.book),
  user: PropTypes.shape($propTypes.user),
  isSignedIn: PropTypes.bool.isRequired,
  canRead: PropTypes.bool.isRequired,
  addBookToMyBooks: PropTypes.func.isRequired,
  deleteBookFromMyBooks: PropTypes.func.isRequired,
  openBookAccessRestrictionDialog: PropTypes.func.isRequired,
  setBookRating: PropTypes.func.isRequired,
  isVotingBook: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return {
    book: getBook(state, { id }),
    user: getUser(state),
    canRead: canReadBook(state, id),
    isSignedIn: getIsSignedIn(state),
    isVotingBook: getIsVotingBook(state),
  };
};

const mapDispatchToProps = { ...appActions, ...firestoreActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
