import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Onboard = () => {
    const history = useHistory();
    return (
    <div>
    <Row className="text-center">
        <Col>
        <h3>
         Projektin tarkoituksena on auttaa vammautuneita ihmisiä etsimään henkilökohtaisia avustajia
         ja samalla helpoittaa avustajien työllistymisessä.
        </h3>
        <h5 className="mt-4 mb-2">Pääset luomaan tilisi</h5>
        <Button onClick={() => history.push('/register')}>Täältä</Button>
        </Col>
    </Row>
    <Row className="mt-5">
        <img className="d-block m-auto" height="250" alt="onboard image" src="/images/onboard.svg" />
    </Row>
</div>
    );
}
    
export default Onboard;
