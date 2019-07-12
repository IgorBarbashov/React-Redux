import React, {Component} from 'react';
import Link from 'next/link';

class Menu extends Component {
    render() {
        return (
            <div>
                <Link href="/">На главную</Link>{' '}
                <Link href="/about-us">О нас</Link>{' '}
                <Link href="/news">Новости</Link>{' '}
                <Link href="/contacts">Контакты</Link>
            </div>
        );
    }
}

export default Menu;