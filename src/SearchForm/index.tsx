import React from 'react';
import InputWithLabel from '../InputWithLabel.tsx';
import cs from 'classnames';
import styles from '../App.module.scss';

type SearchFormProps = {
    searchTerm: string;
    className: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

//console.log(estaVaribleNoEstáDefinida)
const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
    className,
}: SearchFormProps) => (
        <form onSubmit={onSearchSubmit} className='search-form'>
            <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
            >
            <strong>Search:</strong>
            </InputWithLabel>
            <button
             type="submit"
             disabled={!searchTerm}
             className={cs(styles.button, styles.buttonLarge)}>
            Submit
            </button>
        </form>
    )

export default SearchForm