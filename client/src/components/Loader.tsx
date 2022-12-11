import { nanoid } from 'nanoid'
import '../style/loader.css'

/**
 *
 * @returns A loader element.
 */
export default function Loader() {
    const loaderLine = (id: string) => (
        <div key={id} className="loader-line-wrap">
            <div className="loader-line"></div>
        </div>
    )
    return (
        <div className="loader-inner m-auto">
            {new Array<JSX.Element>(5)
                .fill(<div></div>)
                .map((el) => loaderLine(nanoid()))}
        </div>
    )
}
