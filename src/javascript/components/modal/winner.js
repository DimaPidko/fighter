import showModal from './modal';
import createElement from '../../helpers/domHelper.js';

export default function showWinnerModal(fighter) {
    const bodyElement = createElement({ tagName: 'div' });
    const winnerName = createElement({ tagName: 'span' });
    winnerName.innerText = `Winner: ${fighter.name}`;

    bodyElement.append(winnerName);

    showModal({
        title: 'Fight Result',
        bodyElement,
        onClose: () => {
            console.log('Modal closed');
        }
    });
}
