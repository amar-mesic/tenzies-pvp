import '../style/footer.css'
import Anchor from './Anchor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

export default function Footer() {
    return (
        <footer>
            <p style={{ textAlign: 'center' }}>Developer Contact Info</p>
            <ul className="social-info" style={{ listStyle: 'none' }}>
                <li>
                    <Anchor href="https://www.facebook.com/amar.mesic.100">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                    </Anchor>
                </li>
                <li>
                    <Anchor href="#">
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                    </Anchor>
                </li>
                <li>
                    <Anchor href="https://github.com/amar-mesic">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                    </Anchor>
                </li>
                <li>
                    <Anchor href="https://stackoverflow.com/users/14022782/amar-mesic">
                        <FontAwesomeIcon icon={['fab', 'stack-overflow']} />
                    </Anchor>
                </li>
            </ul>
            <hr />
            <p className="copyright">Retto Inc. © 2018</p>
        </footer>
    )
}
