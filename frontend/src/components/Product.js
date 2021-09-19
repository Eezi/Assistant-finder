import React from "react";
import styled from "styled-components";
import Raiting from "./Raiting";
import { Link } from "react-router-dom";

const UserCard = ({ description, name, phone, email, gender, region, _id }) => {
  const checkGender = () => {
      if (gender === 'male') return 'Mies'
      if (gender === 'female') return 'Nainen'
      return 'Muu'
  }
  return (
    <Card>
      {/*<img
        style={{ maxWidth: "198px", maxHeight: "160px", margin: "0 auto" }}
        src={product.image}
      />*/}
      <Info>
        <Link to={`/product/${_id}`}>
          <h5>{name}</h5>
          <h5>{phone}</h5>
          <h5>{email}</h5>
          <h5>{region}</h5>
          <h5>{checkGender()}</h5>
        </Link>

        {/*<Raiting value={product.rating} text={`${product.numReviews}`} />*/}
        <p style={{ margin: ".5rem 0" }}>{description}</p>
      </Info>
    </Card>
  );
};

export default UserCard;

const Card = styled.div`
  border: 1px solid #47484f;
  max-width: 200px;
`;

const Info = styled.div`
  padding: 0.6rem;
`;
