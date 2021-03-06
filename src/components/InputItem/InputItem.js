import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import styles from './InputItem.module.css';
import PropTypes from 'prop-types';

class InputItem extends React.Component {
  state = {
    inputValue: '',
    inputError: false,
    helperText: ''
  };

  clickButton = () => {
    this.setState({
      inputValue: ''
    });

    //проверка поля ввода на кириллицу и цифры
    const inputValid = /^[а-яА-ЯёЁa0-9]/;

    //проверка на дублирование задачи
    const isHave = this.props.items.some(item => item.value === this.state.inputValue);

    if (!inputValid.test(this.state.inputValue)) {
      this.setState({
        inputError: true,
        helperText: 'Неверный ввод'
      });
    } else if (isHave) {
      this.setState({
        inputError: true,
        helperText: 'Такая задача уже есть в вашем списке. Введите другое название'
      });
    }
    else {
      this.setState({
        inputError: false,
        helperText: ''
      });
      this.props.addItem(this.state.inputValue);
    }
  };

  render() {
    return (
      <Box className={styles.wrap}>
        <TextField className={styles.input}
          type="text"
          label="Введите название дела..."
          id="outlined"
          variant="outlined"
          value={this.state.inputValue}
          helperText={this.state.helperText}
          error={this.state.inputError}
          onChange={event => this.setState({
            inputValue: event.target.value.toUpperCase(),
            inputError: false
          })}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.clickButton()
          }}}
        />
        <ButtonAdd
          type="submit"
          clickButton={this.clickButton}
        />
      </Box>
    );
  }
}

InputItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  inputValue: PropTypes.number
};

export default InputItem;
