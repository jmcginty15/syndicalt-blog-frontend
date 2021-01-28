import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);
    const followLink = (route) => history.push(route);

    return (
        <div className="NavBar">
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/">{'{S}yndicALT'}</NavbarBrand>
                <NavbarToggler onClick={toggleOpen} />
                <Collapse isOpen={open} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/syndicalt/syndicalt-main">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="NavBar" nav caret>
                                Blog
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => followLink('/blog')}>
                                    Posts
                                </DropdownItem>
                                <DropdownItem onClick={() => followLink('/blog/new-post')}>
                                    New post
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Something else
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>A based catchphrase</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;